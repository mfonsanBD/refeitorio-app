import { Text, View } from "react-native";

const Badge = ({ caracteristica, cor }) => {
  const badgeStyles = {
    gluten: {
      backgroundColor: 'rgba(250, 206, 168, 0.3)',
    },
    vegano: {
      backgroundColor: 'rgba(165, 220, 134, 0.3)',
    },
    lactose: {
      backgroundColor: 'rgba(51, 51, 51, 0.1)',
    },
  }

  const badgeTextStyles = {
    gluten: {
      color: '#A96830',
    },
    vegano: {
      color: '#487D2A',
    },
    lactose: {
      color: '#333333',
    },
  }

  return (
    <View style={{ ...badgeStyles[cor], paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ ...badgeTextStyles[cor], textTransform: 'uppercase', fontSize: 10 }}>{caracteristica}</Text>
    </View>
  )
}

export default Badge;