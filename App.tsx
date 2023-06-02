import { ActivityIndicator } from 'react-native'
import { Home } from './src/components/Home'
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from '@expo-google-fonts/inter'

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold })
  return <>{fontsLoaded ? <Home /> : <ActivityIndicator />}</>
}
