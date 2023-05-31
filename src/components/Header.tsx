import { styles } from './styles'
import { View } from 'react-native'
import TodoLogo from '../../assets/logo-todo.svg'

export function Header() {
  return (
    <View style={styles.logo}>
      <TodoLogo />
    </View>
  )
}
