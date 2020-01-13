import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import MenuIcon from '@material-ui/icons/Menu';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'

import ChevronLeft from '@material-ui/icons/ChevronLeft'

const TopBar = inject("uiStore","patientStore")(observer(({ uiStore,patientStore, props }) => {

  const { t, i18n } = useTranslation('translation');

  //Conditional Logic to Display back button during treatment flow
  let buttonToDisplay = (
    patientStore.isLoggedIn && <IconButton onClick={uiStore.toggleMenu} edge="start"  color="inherit" aria-label="menu"> <MenuIcon /></IconButton>
  )

  if(uiStore.onTreatmentFlow){
    buttonToDisplay = ( <IconButton onClick={uiStore.toggleTreatmentFlow} edge="start"  color="inherit" aria-label="menu"> <ChevronLeft /></IconButton>)
  }

    return(
        <GradientAppBar color={uiStore.offline ? "secondary" : "primary"} offline={uiStore.offline} position="static" style={{flexGrow: 1}}>
          <Toolbar>
            {buttonToDisplay}
            <Typography variant="h6" style={{flexGrow: 1}}>
            {t("title")}
            </Typography>
            <Typography variant="h6" color={!uiStore.offline ? "secondary" : "primary"} style={{color: "flex-end"}} >
            {uiStore.offline ? <OfflineBoltIcon /> : ""}
            </Typography>
          </Toolbar>
        </GradientAppBar>
    )
}));

const GradientAppBar = styled(AppBar)`
  background: (170.51deg, #2D79E6 -22.97%, #053476 116.51%);

  ${({ offline }) => offline && `
  background: none;
`}
`

export default TopBar;
