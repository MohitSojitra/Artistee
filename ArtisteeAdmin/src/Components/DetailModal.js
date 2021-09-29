import {Box, Button, Grid, TextField} from '@mui/material'
import React, {memo, useCallback, useEffect} from 'react'
import {toast} from 'react-toastify'
import {colors} from '../Theme/ColorPalette'
import {Api} from '../utils/API'
import CustomModel from './CustomModel'

const DetailModal = props => {
  const {handleClose, open, edit, editData, setArtistData, artistData} = props
  const [currentFile, setCurrentFile] = React.useState()
  const [previewImage, setPreviewImage] = React.useState(
    editData?.profile_pic || '',
  )
  const [submitDisabled, setSubmitDisabled] = React.useState(true)
  const [inputData, setInputData] = React.useState({
    stage_name: editData?.stage_name || '',
    name: editData?.name || '',
    genere: editData?.genere || '',
    address: editData?.address || '',
    profile_pic: previewImage,
    mobile_no: editData?.mobile_no || '',
    terriotary_of_representation: editData?.terriotary_of_representation || '',
  })
  const [formError, setFormError] = React.useState({
    artistField: '',
    stageField: '',
    genreField: '',
    mobileField: '',
    terriotaryField: '',
    addressField: '',
  })

  //handle input fields
  const handleSelectFile = e => {
    setCurrentFile(e.target.files[0])
    setPreviewImage(URL.createObjectURL(e.target.files[0]))
  }
  const handleArtistInput = e => {
    setInputData({...inputData, name: e.target.value})
  }
  const handleStageInput = e => {
    setInputData({...inputData, stage_name: e.target.value})
  }
  const handleGenereInput = e => {
    setInputData({...inputData, genere: e.target.value})
  }
  const handleMobileInput = e => {
    setInputData({...inputData, mobile_no: e.target.value})
  }
  const handleTerritoriesInput = e => {
    setInputData({
      ...inputData,
      terriotary_of_representation: e.target.value,
    })
  }
  const handleAddressInput = e => {
    setInputData({...inputData, address: e.target.value})
  }

  //handle error of input field
  const artistValidate = () => {
    if (inputData.name === '') {
      setFormError({...formError, artistField: 'Enter Artist Name'})
      setSubmitDisabled(true)
      console.log('input=====>', inputData)
      return false
    } else {
      setFormError({...formError, artistField: ''})
      setSubmitDisabled(false)
      return true
    }
  }
  const stageValidate = () => {
    if (inputData.stage_name === '') {
      setFormError({...formError, stageField: 'Enter Stage Name'})
      setSubmitDisabled(true)
      return false
    } else {
      setFormError({...formError, stageField: ''})
      setSubmitDisabled(false)
      return true
    }
  }
  const genereValidate = () => {
    if (inputData.genere === '') {
      setFormError({...formError, genreField: 'Enter Genere Name'})
      setSubmitDisabled(true)
    } else {
      setFormError({...formError, genreField: ''})
      setSubmitDisabled(false)
    }
  }
  const mobileNumberValidate = () => {
    if (inputData.mobile_no === '') {
      setFormError({...formError, mobileField: 'Enter Mobile Number'})
      setSubmitDisabled(true)
    } else {
      setFormError({...formError, mobileField: ''})
      setSubmitDisabled(false)
    }
  }
  const territoriesValidate = () => {
    if (inputData.terriotary_of_representation === '') {
      setFormError({...formError, terriotaryField: 'Enter terriotary'})
      setSubmitDisabled(true)
    } else {
      setFormError({...formError, terriotaryField: ''})
      setSubmitDisabled(false)
    }
  }
  const addressValidate = () => {
    if (inputData.address === '') {
      setFormError({...formError, addressField: 'Enter Artist Address'})
      setSubmitDisabled(true)
    } else {
      setFormError({...formError, addressField: ''})
      setSubmitDisabled(false)
    }
  }

  const checkValidation = () => {
    const obj = {
      artistField: '',
      stageField: '',
      genreField: '',
      mobileField: '',
      terriotaryField: '',
      addressField: '',
    }
    let isError = false
    if (inputData.name === '') {
      obj.artistField = 'Enter Artist Name'
      isError = true
    }
    if (inputData.stage_name === '') {
      obj.stageField = 'Enter Stage Name'
      isError = true
    }
    if (inputData.genere === '') {
      obj.genreField = 'Enter Genere Name'
      isError = true
    }
    if (inputData.mobile_no === '') {
      obj.mobileField = 'Enter Mobile Number'
      isError = true
    }
    if (inputData.terriotary_of_representation === '') {
      obj.terriotaryField = 'Enter terriotary'
      isError = true
    }
    if (inputData.address === '') {
      obj.addressField = 'Enter Artist Address'
      isError = true
    }
    return {error: obj, isError}
  }

  const _handleAddArtist = useCallback(async () => {
    // if (!artistValidate()) {
    //   return;
    // } else if (!stageValidate()) {
    //   return;
    // }
    // artistValidate();
    // stageValidate();
    // genereValidate();
    // mobileNumberValidate();
    // territoriesValidate();
    // addressValidate();
    const {error, isError} = checkValidation()

    if (isError) {
      console.log({error, isError})
      setFormError({...error})
      return
    }

    // get Put Sign url
    const {statusCode, data} = await Api.postRequest('/artist/getPutUrl')
    const {isOk, url, message} = JSON.parse(data)
    if (statusCode === 400 || statusCode === 500 || !isOk) {
      toast.error(message)
      return
    }

    // put image in s3 bucket

    const imageUrl = await Api.putImageInS3Bucket(url, currentFile)

    // save artist in database
    const {statusCode: sCode, data: d} = await Api.postRequest(
      '/artist/add-artist',
      {
        ...inputData,
        profile_pic: imageUrl,
      },
    )
    const {isOk: isReady, message: m, item} = JSON.parse(d)
    if (sCode === 400 || sCode === 500 || !isReady) {
      toast.error(m)
      return
    }
    toast.success(m)
    const newData = [...artistData]
    newData.unshift(item[0])
    setArtistData(newData)
    handleClose()
  }, [currentFile, inputData])

  const _handleEditArtist = async () => {
    try {
      let imageUrl
      if (currentFile) {
        const {statusCode, data} = await Api.postRequest('/artist/getPutUrl')
        const {isOk, url, message} = JSON.parse(data)
        if (statusCode === 400 || statusCode === 500 || !isOk) {
          toast.error(message)
          return
        }
        console.log('CurrentFile,', currentFile)
        // put image in s3 bucket
        imageUrl = await Api.putImageInS3Bucket(url, currentFile)
      }

      const {statusCode: sCode, data: d} = await Api.putRequest(
        `/artist/${editData?.id}`,
        {
          ...inputData,
          profile_pic: imageUrl ? imageUrl : editData?.profile_pic,
        },
      )
      const {isOk: isReady, message: m} = JSON.parse(d)
      if (sCode === 400 || sCode === 500 || !isReady) {
        toast.error(m)
        return
      }
      toast.success(m)
      handleClose()

      const newData = [...artistData]
      let index = newData.findIndex(item => item.id === editData.id)

      newData[index].stage_name = inputData.stage_name
      newData[index].name = inputData.name
      newData[index].genere = inputData.genere
      newData[index].address = inputData.address
      newData[index].profile_pic = imageUrl ? imageUrl : editData?.profile_pic
      newData[index].mobile_no = inputData.mobile_no
      newData[index].terriotary_of_representation =
        inputData.terriotary_of_representation
      setArtistData(newData)
    } catch (error) {
      console.log('Error====>', error)
      toast.error(error)
    }
  }

  return (
    <CustomModel handleClose={handleClose} open={open}>
      <TextField
        id="outlined-error-helper-text"
        placeholder="Enter Artist Name"
        textType="text"
        style={{width: '80%', marginBottom: '20px'}}
        value={inputData.name}
        onChange={handleArtistInput}
        // onBlur={artistValidate}
        helperText={formError.artistField}
        error={formError.artistField !== ''}
      />
      <TextField
        id="outlined-error"
        placeholder="Enter Stage Name"
        type="text"
        defaultValue={edit ? editData?.stage : ''}
        style={{width: '80%', marginBottom: '20px'}}
        value={inputData.stage_name}
        onChange={handleStageInput}
        onBlur={stageValidate}
        helperText={formError.stageField}
        error={formError.stageField === '' ? false : true}
      />
      <TextField
        id="outlined-error"
        placeholder="Enter Genere"
        type="text"
        defaultValue={edit ? editData?.genere : ''}
        style={{width: '80%', marginBottom: '20px'}}
        value={inputData.genere}
        onChange={handleGenereInput}
        onBlur={genereValidate}
        helperText={formError.genreField}
        error={formError.genreField === '' ? false : true}
      />
      <TextField
        id="outlined-error"
        placeholder="Enter Mobile Number"
        type="number"
        defaultValue={edit ? editData?.mobile_no : ''}
        style={{width: '80%', marginBottom: '20px'}}
        value={inputData.mobile_no}
        onChange={handleMobileInput}
        onBlur={mobileNumberValidate}
        helperText={formError.mobileField}
        error={formError.mobileField === '' ? false : true}
      />
      <TextField
        id="outlined-error"
        type="text"
        placeholder="Enter Territories of Representation"
        defaultValue={edit ? editData?.terriotary_of_representation : ''}
        style={{width: '80%', marginBottom: '20px'}}
        value={inputData.terriotary_of_representation}
        onChange={handleTerritoriesInput}
        onBlur={territoriesValidate}
        helperText={formError.terriotaryField}
        error={formError.terriotaryField === '' ? false : true}
      />
      <TextField
        id="outlined-error"
        placeholder="Enter Artist Address"
        type="text"
        defaultValue={edit ? editData?.address : ''}
        style={{width: '80%', marginBottom: '20px'}}
        value={inputData.address}
        onChange={handleAddressInput}
        onBlur={addressValidate}
        helperText={formError.addressField}
        error={formError.addressField === '' ? false : true}
      />
      <Grid
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '80%',
        }}
      >
        <TextField
          // error
          InputLabelProps={{
            shrink: true,
            accept: 'image/png, image/gif, image/jpeg',
          }}
          onChange={handleSelectFile}
          type="file"
          id="outlined-error"
          label="Upload Profile Image"
          style={{minWidth: '80%'}}
        />
        {previewImage && (
          <Box>
            <img
              className="preview my20"
              src={previewImage}
              alt=""
              style={{height: '100px', width: '100px', borderRadius: '20px'}}
            />
          </Box>
        )}
      </Grid>
      <Box
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '30px',
        }}
      >
        <Button
          variant={'contained'}
          style={{backgroundColor: colors.deleteRed}}
          onClick={() => {
            handleClose()
            setCurrentFile('')
            setPreviewImage('')
          }}
        >
          Cancel
        </Button>
        <Button
          variant={'contained'}
          onClick={edit ? _handleEditArtist : _handleAddArtist}
          style={{background: colors.primary}}
        >
          {edit ? 'Edit' : 'Add'}
        </Button>
      </Box>
    </CustomModel>
  )
}

export default memo(DetailModal)
