import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from '@material-ui/core';
import InsertDriveFileTwoToneIcon from '@material-ui/icons/InsertDriveFileTwoTone';
import { useState } from 'react';
import { DropzoneDialog } from 'material-ui-dropzone';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import './admin.scss';
import { useEffect } from 'react';
// import bg from '../../assets/images/footer-bg.jpg';

const CircularProgressWithLabel = (props) => {
  return (
    <Box position='relative' display='inline-flex'>
      <CircularProgress variant='determinate' {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position='absolute'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Typography
          variant='subtitle1'
          component='div'
          color='textSecondary'
        >{`${props.value}%`}</Typography>
      </Box>
    </Box>
  );
};

const Admin = () => {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(false);

  const [openSB, setOpenSB] = useState(false);
  const [msgSB, setMsbSB] = useState('hehe');
  const [typeSB, setTypeSB] = useState('success');
  const [typeFile, setTypeFile] = useState('');
  const baseUrl = 'http://localhost:5000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(baseUrl + '/init');
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSB(false);
  };

  const handleCLick = async (type, file) => {
    setLoading(true);
    try {
      switch (type) {
        case 'sql':
          const { data: sqlRes } = await axios.get(baseUrl + '/sync_sql');
          console.log(sqlRes);
          setMsbSB('Load table rating to Sqoop done!!');
          break;
        case 'csv':
          if (file) {
            const formData = new FormData();
            formData.append('file', file[0]);
            formData.append('type', typeFile);
            const { data: csvRes } = await axios.post(
              baseUrl + '/upload',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            );
            console.log(csvRes);
            // for (var pair of formData.entries()) {
            //   console.log(pair[0] + ', ' + pair[1]);
            // }
            setTypeFile('');
            setMsbSB(`Load csv file: ${file[0].name} to Sqoop done!!`);
          }
          break;
        case 'training':
          const { data: resultTrain } = await axios.get(baseUrl + '/train');
          console.log(resultTrain.toFixed(2));
          setResult(resultTrain);
          setMsbSB('Traning Done!!');
          break;
        case 'clean':
          const { data: resultClean } = await axios.get(
            baseUrl + '/clean_ds_csv'
          );
          console.log(resultClean);
          setMsbSB('clean ds csv done!!');
          break;
        default:
          throw new Error('type not found');
      }

      setTypeSB('success');
    } catch (error) {
      console.log(error);
      setMsbSB('Something Wrong !!!');
      setTypeSB('error');
    }
    setLoading(false);
    setOpenSB(true);
  };

  return (
    // <div className='admin_wrapper' style={{ backgroundImage: `url(${bg})` }}>
    <div className='admin_wrapper'>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSB}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={typeSB}
          elevation={6}
          variant='filled'
        >
          {msgSB}
        </Alert>
      </Snackbar>
      <div className='container'>
        <h2>Tải dữ liệu vào HDFS</h2>
        <div className='importdata'>
          <div className='importdata__btn'>
            <Button
              variant='contained'
              color='primary'
              disabled={loading}
              onClick={() => handleCLick('sql')}
            >
              từ SQL
            </Button>
            <div className='file'>
              {loading ? (
                <Button
                  className='file__btn'
                  variant='contained'
                  color='primary'
                  onClick={() => setOpen(true)}
                  disabled={true}
                >
                  từ tệp CSV
                </Button>
              ) : (
                <Button
                  className='file__btn'
                  variant='contained'
                  color='primary'
                  onClick={() => setOpen(true)}
                  disabled={!typeFile}
                >
                  từ tệp CSV
                </Button>
              )}
              <FormControl>
                <InputLabel>Tệp</InputLabel>
                <Select
                  value={typeFile}
                  onChange={(e) => setTypeFile(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value='ratings'>Ratings</MenuItem>
                  <MenuItem value='movies'>Movies</MenuItem>
                </Select>
                <FormHelperText>Chọn loại tệp CSV</FormHelperText>
              </FormControl>
              <DropzoneDialog
                dialogTitle='Chọn tệp CSV '
                acceptedFiles={['.csv']}
                cancelButtonText={'cancel'}
                submitButtonText={'submit'}
                getPreviewIcon={() => <InsertDriveFileTwoToneIcon />}
                filesLimit={1}
                maxFileSize={50000000}
                open={open}
                onClose={() => setOpen(false)}
                onSave={(files) => {
                  handleCLick('csv', files);
                  setOpen(false);
                }}
                showPreviews={true}
                showFileNamesInPreview={true}
              />
            </div>
          </div>
        </div>
        <h2>Training</h2>
        <div className='trainning'>
          <Button
            color='primary'
            variant='contained'
            disabled={loading}
            onClick={() => handleCLick('training')}
          >
            Training
          </Button>
          <div className='trainning__result'>
            <span>Độ chính xác: </span>
            <CircularProgressWithLabel
              thickness={4}
              size='75px'
              value={result}
            />
          </div>
        </div>
        <Button
          variant='outlined'
          color='secondary'
          onClick={() => handleCLick('clean')}
          target='_blank'
          className='clean'
        >
          Xóa dữ liệu CSV
        </Button>
        <div className='manager'>
          <Button
            variant='outlined'
            color='primary'
            href='http://localhost:9870/'
            target='_blank'
            className='manager__link'
          >
            Quản lý HDFS
          </Button>
          <Button
            variant='outlined'
            color='primary'
            href='http://localhost:8080/'
            target='_blank'
            className='manager__link'
          >
            Quản lý Spark
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
