import { StatusBar } from 'react-native'
import { Header } from './Header'
import { Form } from './Form'

export function Home() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header />
      <Form />
    </>
  )
}
