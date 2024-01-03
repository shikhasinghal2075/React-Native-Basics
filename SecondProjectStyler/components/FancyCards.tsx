import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FancyCards = () => {
  return (
    <View>
      <Text style={styles.headingText}>Trending Places</Text>
      <View style={[styles.card, styles.cardElevated]}>
            <Image 
                source={{
                    uri: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                }}
                style={styles.cardImage}
            />
            <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>Tambon Khlong Sok</Text>
                <Text style={styles.cardLabel}>Thailand</Text>
                <Text style={styles.cardDescription}>Photo of Woman Sitting on Boat Spreading Her Arms. Just adding extra text to increase description.</Text>
                <Text style={styles.cardFooter}>A place in Thailand</Text>
            </View>
      </View>
    </View>
  )
}

export default FancyCards

const styles = StyleSheet.create({
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8
    },
    card:{
        width:350,
        height:360,
        borderRadius:6,
        marginVertical: 12,
        marginHorizontal:16
    },
    cardElevated:{
        backgroundColor: '#50DBB4',
        elevation: 3,
        shadowOffset:{
            width: 1,
            height: 1
        }
    },
    cardImage:{
        height: 180,
        marginBottom: 8,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
    },
    cardBody:{
       flex: 1,
       flexGrow: 1,
       paddingHorizontal: 12
    },
    cardTitle:{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 4
    },
    cardLabel:{
        fontSize: 14,
        color: '#000000',
        marginBottom: 6
    },
    cardDescription:{
        fontSize: 12,
        color: '#000000',
        marginBottom: 12,
        marginTop: 6,
        flexShrink: 1
    },
    cardFooter:{
        color: '#000000',
    },
})