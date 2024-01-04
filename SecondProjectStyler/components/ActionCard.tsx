import React from 'react'
import { 
    StyleSheet, 
    Text,
    View,
    Linking, 
    Image,
    TouchableOpacity
} from 'react-native'

const ActionCard = () => {
    function openWebsite(websiteLink: string){
        Linking.openURL(websiteLink)
    }

  return (
    <View>
      <Text style={styles.headingText}>Blog Card</Text>
      <View style={[styles.card, styles.elevatedCard]}>
        <View style={styles.headingContainer}>
            <Text style={styles.headerText}>
                What's new in Javascript 21 - ES12
            </Text>
        </View>
        <Image 
            source={{
                uri: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            }}
        style={styles.cardImage}
        />
        <View style={styles.bodyContainer}>
            <Text numberOfLines={3}>
                It's worth noting that JavaScript development is an ever-evolving field, and new features are introduced with each ECMAScript update. If ECMAScript 2022 or a later version has been released since my last update, I recommend checking the official ECMAScript specification or other reliable sources for the latest features and enhancements.
            </Text>
        </View>
        <View style={styles.footerContainer}>
            <TouchableOpacity
            onPress={() => openWebsite('https://blog.learncodeonline.in/whats-new-in-javascript-21-es12')}
            >
                <Text style={styles.socialLinks}>Read More</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => openWebsite('https://blog.learncodeonline.in/whats-new-in-javascript-21-es12')}
            >
                <Text style={styles.socialLinks}>Follow me</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ActionCard

const styles = StyleSheet.create({
    headingText:{
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8
    },
    card:{
        width: 350,
        height: 360,
        borderRadius:5,
        marginVertical: 12,
        marginHorizontal: 16
    },
    elevatedCard:{
        backgroundColor: '#5DA3FA',
        elevation: 3,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowColor: '#333',
        shadowOpacity: 0.4,
    },
    headingContainer:{
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText:{
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },
    cardImage:{
        height: 180,
        marginBottom: 8,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
    },
    bodyContainer:{
        padding: 10
    },
    footerContainer:{
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    socialLinks:{
        fontSize: 16,
        color: '#000000',
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 6
    }
})