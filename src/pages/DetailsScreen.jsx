import React, {memo, useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {addFavorite, fetchProducts} from '../api/ShopSlice';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

const DetailsScreen = ({route: {params}, navigation}) => {
  // console.log(params, 'params');
  const dispatch = useDispatch();
  const {isLoading, error, products} = useSelector(state => state.products);

  const {itemId} = params;
  // searching for identical product
  const product = products.filter(item => item.id === itemId);

  // for scrolling of images
  const width = Dimensions.get('window').width;
  const scrollX = new Animated.Value(0);

  // for calling data
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const addToCard = item => {
    dispatch(addFavorite(item));
    navigation.navigate('Favourites');
  };
  // for rendring flatlist
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          width: width,
          height: 300,
        }}>
        <Image
          source={{uri: item}}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#00000086'}}>
      {isLoading ? (
        <View style={{flex: 1, paddingVertical: 250}}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : error ? (
        <View style={{flex: 1, paddingVertical: 250}}>
          <Text>{error}</Text>
        </View>
      ) : (
        <View style={styles.itemContainer}>
          <View style={styles.imageContainer}>
            <FlatList
              data={product[0]?.images && product[0].images}
              renderItem={renderItem}
              horizontal
              decelerationRate={0.8}
              snapToInterval={width}
              bounces={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: false},
              )}
            />
          </View>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>
              Category:{' '}
              <Text style={{marginRight: 20}}>
                {' '}
                &nbsp; {product[0].category.name}
              </Text>
            </Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Product Name:
              <Text> &nbsp; {product[0].title}</Text>
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              Price:
              <Text> &nbsp; {product[0].description} </Text>
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              Price:
              <Text> &nbsp; {product[0].price} 💲</Text>
            </Text>
          </View>
          <View style={styles.btnsContainer}>
            <TouchableOpacity onPress={() => addToCard(product[0])}>
              <Text style={styles.AddBtn}>Add To Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BuyNow', {id: product[0].id})
              }>
              <Text style={styles.BuyBtn}>Buy</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default memo(DetailsScreen);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    width: '100%',
    marginVertical: 5,
    padding: 5,
    backgroundColor: '#00000075',
  },
  imageContainer: {
    width: '100%',
    height: '40%',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryContainer: {
    width: '100%',
    height: '8%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 7,
  },
  titleContainer: {
    width: '100%',
    height: '8%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 7,
  },
  priceContainer: {
    height: '8%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 7,
  },
  descriptionContainer: {
    height: '15%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 7,
  },
  btnsContainer: {
    flex: 1,
    width: '100%',
  },
  AddBtn: {
    width: '70%',
    height: 40,
    borderRadius: 20,
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  BuyBtn: {
    width: '70%',
    height: 40,
    borderRadius: 20,
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#00a',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 10,
    paddingTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
