import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import "fontsource-roboto"
import './options.css'
import {
  Card,
  Button,
  CardContent,
  Typography,
  TextField,
  Grid,
  Box
} from "@material-ui/core"
import {
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions
} from "../utills/storage"

type formState = "ready" | "saving"

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)
  const [formState, setformState] = useState<formState>("ready")

  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options)
    })
  }, [])

  const handleHomeCityChange = (homeCity: string) => {
    setOptions({
      ...options,
      homeCity
    })
  }

  const handleSaveButtonClick = () => {
    setformState("saving")
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setformState("ready")
      }, 1000)
    })
  }

  if (!options) {
    return null
  }

  const isFieldsDisabled = formState == "saving"

  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction='column' spacing={4}>
            <Grid item>
              <Typography variant="h4">
                Weather Extension Options
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1'>Home City name</Typography>
              <TextField
                fullWidth
                placeholder="Enter a home city"
                value={options.homeCity}
                onChange={event => handleHomeCityChange(event.target.value)}
                disabled={isFieldsDisabled}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveButtonClick}
                disabled={isFieldsDisabled}
              >
                {formState == "ready" ? "Save" : "Saving..."}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
