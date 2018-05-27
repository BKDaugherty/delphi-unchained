import React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import DelphiTempleImage from '../assets/images/DelphiTemple.jpg'

const NavItem = styled(NavLink)`
    color:black;
    text-decoration:none;
    padding:1em;

    :hover{
        text-decoration:underline;
    }
`
const Navigator = ({links}) => (
    <StyledNav>
        {links.map((link, key) => (<NavItem key={key} to={link.to}>{link.label}</NavItem>))}
    </StyledNav>
)

const StyledNav = styled.nav`
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    marginLeft:3em;
    marginRight:3em;
`

const Title = styled.h2`
`

const SubTitle = styled.p`
`

const CenteredSection = styled.section`
    text-align:center;
    margin:auto;
`

const Header = ({links, title, subtitle}) => (
    <header>
        <Navigator links={links}/>
        <CenteredSection>
            <Title>{title}</Title>
            <img src={DelphiTempleImage}/>
            <SubTitle>{subtitle}</SubTitle>
        </CenteredSection>
    </header>
)

const StyledFooter = styled.footer`
    position:fixed;
    padding:20px;
    height:25px;
    width:100%;
    bottom:0;
    left:0;
    background:#ddd;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-around;
`

const FooterLink = styled.a`
    text-decoration:none;
    font-size:small;
    color:black;

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


class LandingPage extends React.Component {

    render(){
        return (
        <main>   
            <Header title={"Delphi Unchained"}
                subtitle="A simple dapp to support a simple mechanism for staking and claims."
                links={[{label:'Dashboard', to:'/dashboard'}, {label:'Stake Explorer', to:'/stake'}]}/>
            <Footer/>
        </main>
    )
    }

}

export default LandingPage