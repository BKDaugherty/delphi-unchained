import React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import DelphiTempleImage from '../assets/images/DelphiTemple.jpg'
import AppHeader from '../components/AppHeader'
import {drizzleConnect} from 'drizzle-react'

const Title = styled.h2`
    color:#659dbd;
`

const SubTitleBox = styled.div`
    padding:1.5%;
    margin:auto;
    border-radius:5px;
    background-color:#DAAD86;
    width:50%;
    
`

const SubTitle = styled.p`
    color:white;
    text-align:center;
`

const CenteredSection = styled.section`
    text-align:center;
    margin:auto;
`

const StyledHeaderWrapper = styled.header`
`

const Header = ({links, title, subtitle}) => (
   <AppHeader/>
)

const StyledFooter = styled.footer`
    position:fixed;
    padding:20px;
    width:100%;
    bottom:0;
    left:0;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-around;
    background-color: #bc986a;
`

    // background-color:#BC986A;


const FooterLink = styled.a`
    text-decoration:none;
    font-size:small;
    color:#FBEEC1;

    :hover{
        text-decoration:underline;
    }
`

const LinkContainer = styled.div`
    display:flex;
    flex-direction:column;
    text-direction:center;
    align-items:center;
    justify-content:center;
`



const FooterLinkContainer = styled.section`
    text-align:center;
    width:100%;
    margin:auto;
    display:flex;
    justify-content:space-around;
`

const Footer = (props) => (
    <StyledFooter>
        <FooterLinkContainer>
            {/* Github links and Delphi Specification*/}
            <FooterLink href="https://github.com/BKDaugherty/delphi-unchained">Delphi Unchained</FooterLink>
            <FooterLink href="https://github.com/c-o-l-o-r/DelphiAPI">DelphiAPI and Caching Layer</FooterLink>
            <FooterLink href="https://staking.network">Delphi Specification</FooterLink>
            <FooterLink href="https://github.com/Bounties-Network/Delphi">Delphi Protocol Implementation</FooterLink>
        </FooterLinkContainer>
    </StyledFooter>
)

const MainLandingCard = CenteredSection.extend`
    padding:1%;
    background-color:#fff;
    width:40%;
    border-radius:3px;
`

//style={{backgroundColor:'#659DBD'}}
class LandingPage extends React.Component {
    render(){
        return (
        <div>   
            <AppHeader userEthAddress={this.props.userEthAddress}/>
            <div style={{marginTop:100}}/>
            <MainLandingCard>
                <Title>{"Delphi Unchained"}</Title>
                    <img src={DelphiTempleImage}/>
                    <SubTitleBox>
                            <SubTitle>{"A simple dapp to support a simple mechanism for staking and claims."}</SubTitle>
                    </SubTitleBox>
            </MainLandingCard>
            <Footer/>
        </div>
    )
    }

}
const mapStateToProps = (state) => ({ userEthAddress: state.accounts[0]})

export default drizzleConnect(LandingPage, mapStateToProps)