import React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Image,
    FlatList
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const images = "../images/"

const Info = () => {
    const renderItem = (item: any) => {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {/* resizeMode='contain' */}
                <Image style={{ height: screenHeight, width: screenWidth }} source={item.item.imagePath} />
            </View>

        )
    }

    const screenImages = [
        {
            id : 1,
            imagePath: require(`${images}1.jpg`)
        },
        {
            id : 2,
            imagePath: require(`${images}2.jpg`)
        },
        {
            id : 3,
            imagePath: require(`${images}3.jpg`)
        },
        {
            id : 4,
            imagePath: require(`${images}4.jpg`)
        },
        {
            id : 5,
            imagePath: require(`${images}5.jpg`)
        },
        {
            id : 6,
            imagePath: require(`${images}6.jpg`)
        },
        {
            id : 7,
            imagePath: require(`${images}7.jpg`)
        },
        {
            id : 8,
            imagePath: require(`${images}8.jpg`)
        },
        {
            id : 9,
            imagePath: require(`${images}9.jpg`)
        },
        {
            id : 10,
            imagePath: require(`${images}10.jpg`)
        }
    ]

    return (
        <View style={styles.container}>
            <FlatList
                data={screenImages}
                renderItem={renderItem}
                keyExtractor={(item:any) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={true}
            />
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
    }
});

export default Info;
