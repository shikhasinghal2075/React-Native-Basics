import React from 'react'
import { 
    Image,
    ScrollView,
    StyleSheet,
    Text, 
    View 
} from 'react-native'

const ContactList = () => {
    const contacts = [
        {
            uid: 1,
            name: 'Shikha Singhal',
            status: 'Senior Embedded System Engineer',
            imageUrl: 'https://avatars.githubusercontent.com/u/60216456?s=96&v=4'
        },
        {
            uid: 2,
            name: 'Ramanpreet Kaur',
            status: 'Senior Embedded System Engineer',
            imageUrl: 'https://avatars.githubusercontent.com/u/60250191?v=4'
        },
        {
            uid: 3,
            name: 'Vivek Aggarwal',
            status: 'Senior Software Development Engineer',
            imageUrl: 'https://avatars.githubusercontent.com/u/42837075?v=4'
        },
        {
            uid: 4,
            name: 'Shobha Singhal',
            status: 'Student',
            imageUrl: 'https://avatars.githubusercontent.com/u/90892085?v=4'
        }
    ];
  return (
    <View>
      <Text style={styles.headingText}>Contact List</Text>
      <ScrollView style={styles.container} scrollEnabled={true}>
        {
            contacts.map(({uid, name, status, imageUrl}) => (
                <View key={uid} style={styles.userCard}>
                    <Image 
                       source={{
                        uri: imageUrl,
                       }}
                       style={styles.userImage}
                    />
                    <View>
                        <Text style={styles.userName}>{name}</Text>
                        <Text style={styles.userStatus}>{status}</Text>
                    </View>                   
                </View>
            ))
        }
      </ScrollView>
    </View>
  )
}

export default ContactList

const styles = StyleSheet.create({
    headingText:{
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8
    },
    container:{
        paddingHorizontal: 16,
        marginBottom: 4
    },
    userCard:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
        backgroundColor: '#CAD5E2',
        padding: 8,
        borderRadius: 10
    },
    userImage:{
        width: 60,
        height: 60,
        borderRadius: 60/2,
        marginRight: 14
    },
    userName:{
        fontSize: 16,
        fontWeight: '600',
        color: '#000'
    },
    userStatus:{
        fontSize: 12,
        color: '#000'
    }
})