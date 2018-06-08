import React from 'react'
import Blockies from 'react-blockies'
import {CardHeader} from 'material-ui/Card'
import styled from 'styled-components';
import PropTypes from 'prop-types'

// Should be an avatar card that renders either the avatar from ethavatar,
// or the address as a blockie
export const EthAvatarIcon = (props) => {
    return (props.address ? <Blockies
        seed={props.address.toLowerCase()} 
        {...props}
    /> : null)
}

EthAvatarIcon.propTypes = {
    address:PropTypes.string.isRequired
}


  export const EthAvatarFlipCard = (props) => (
    <Trigger>
        <Box>
        <Blockies
            seed={props.address} 
            {...props}
        />
        </Box>
    </Trigger>

  )

  export const EthAddressDisplayCard = (props) => (
      <Trigger>
            <Front>
                <CardHeader title={props.title} subheader={props.subheader}/>
                <EthAvatarIcon address={props.address}/>
            </Front>
            <Back>
                {props.address}
            </Back> 
      </Trigger>
  )

  export const Front = styled.div`
  display:flex;
  position:absolute;
  flex-direction:column;
  align-items:center;
  justify-content:space-around;
  font-family:'PT mono' monospace;
  z-index: 900;
  width: inherit;
  height: inherit;
  border: 1px solid #ccc;
  background: #ffffff;
  text-align: center;
  box-shadow: 0 1px 5px rgba(0,0,0,0.9);
  -webkit-transform: rotateX(0) rotateY(0);
          transform: rotateX(0) rotateY(0);
  -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  /* -- transition is the magic sauce for animation -- */
  -webkit-transition: all .4s ease-in-out;
          transition: all .4s ease-in-out;
  `

  export const Back = styled.div`
  float: none;
    position: absolute;
    display:flex;
    align-items:center;
    justify-content:center;
    overflow:wrap;
    word-break:break-all;
    z-index: 800;
    font-family:'PT mono' monospace;
    width: inherit;
    height: inherit;
    border: 1px solid #ccc;
    background: #fff;
    overflow-wrap:break-word;
    text-align:center;
    -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
    /* -- transition is the magic sauce for animation -- */
    -webkit-transition: all .4s ease-in-out;
            transition: all .4s ease-in-out;
  `

  export const Box = styled.div`
  display: flex;
  flex-direction:column;
  justify-content:space-around;
  align-items:center;
  background: #ddd;
  text-align:center;
  transition: transform 300ms ease-in-out;
  transform-style:preserve-3d;
`



  export const Trigger = styled.div`
  flex:1;
  width:12vw;
  height:15vh;
  position:relative;
  margin:2px;
  border: 5px solid #999;
  background: white;
  align-self:flex-start;
  &:hover ${Front} {
    transform: rotateY(180deg);
  }
  &:hover ${Back} {
  }
  `

 