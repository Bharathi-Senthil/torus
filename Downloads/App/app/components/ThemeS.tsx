'use client'
import {
  Button,
  Col,
  Container,
  Direction,
  DropdownMenu,
  Row,
  ThemeProvider
} from '@gravity-ui/uikit'
import React, { useEffect, useState } from 'react'
import { getCookie } from './cookieMgment';
import { useLanguage } from './languageContext';
import LogoutPage from './logout';
import i18n from './i18n';
const ThemeS = ({ children }: any) => {
  const [selectedOption, setSelectedOption] = useState('light')
  const [selectedDirect, setSelectedDirect] = useState<Direction | undefined>(
    undefined
  )
  const [loading,setLoading] = useState(true)
  const handleAction = (theme: any) => {
    setSelectedOption(theme)
  }

  const handleAction1 = (direction: Direction) => {
    setSelectedDirect(direction)
  }

  const { language, handleLanguageChange } = useLanguage(); 
  const selectedLanguage = getCookie('language') ? getCookie('language') : 'en';
  useEffect(() => {
    if(typeof window !='undefined'){
      setLoading(false)
  }}, [])
  if(loading){
    return<></>
  }
  const keyset:any=i18n.keyset("language")
  return (
    <ThemeProvider theme={selectedOption} direction={selectedDirect}>
      <Container >
        <Row space={0} className='rounded-lg py-1 '>
            {/*<Col>
            <DropdownMenu
              renderSwitcher={props => (
                <Button {...props}>{selectedOption}</Button>
              )}
              items={[
                { action: () => handleAction('light'), text: 'light' },
                { action: () => handleAction('light-hc'), text: 'light-hc' },
                { action: () => handleAction('dark'), text: 'dark' },
                { action: () => handleAction('dark-hc'), text: 'dark-hc' }
              ]}
            />
          </Col>  */}

          <Col className='flex justify-end space-x-2 '>
            <DropdownMenu
              renderSwitcher={props => (
                <Button {...props}>
                  {selectedDirect ? keyset(selectedDirect) : keyset('Direction')}
                </Button>
              )}
              items={[
                { action: () => handleAction1('ltr'), text: keyset('left to right') },
                { action: () => handleAction1('rtl'), text: keyset('right to left') }
              ]}
            />
            <DropdownMenu
              renderSwitcher={props => (
                <Button {...props}>
                  {language ? selectedLanguage : 'Select Language'}
                </Button>
              )}
              items={[
                { action: () => handleLanguageChange('ta'), text: 'Tamil' },
                { action: () => handleLanguageChange('ar'), text: 'Arabic' },
                { action: () => handleLanguageChange('en'), text: 'English' },
                { action: () => handleLanguageChange('fr'), text: 'French' },
                { action: () => handleLanguageChange('ru'), text: 'Russian' }
              ]}
            />
            <LogoutPage/>     
          </Col>
         
        </Row>
        
        {children}
      </Container>
    </ThemeProvider>
  )
}

export default ThemeS
