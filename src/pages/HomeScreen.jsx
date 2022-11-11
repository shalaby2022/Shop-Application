import React, {memo, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import {fetchProducts} from '../api/ShopSlice';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const {isLoading, error, products} = useSelector(state => state.products);
  // for calling data
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // for refresh scrolling of data
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchProducts());
    setInterval(() => {
      setRefreshing(false);
    }, 2000);
  };

  // for rendring flatlist
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('Details', {itemId: item.id})}>
        <View>
          <View style={styles.imageContainer}>
            <Image source={{uri: item.category.image}} style={styles.image} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title.slice(0, 22)}</Text>
          </View>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{item.category.name}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{item.price} 💲</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return <View style={{height: 5, width: '100%'}} />;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#00000086', padding: 7}}>
      {isLoading ? (
        <View style={{flex: 1, paddingVertical: 250}}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : error ? (
        <View style={{flex: 1, paddingVertical: 250}}>
          <Text>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item, ind) => item.id}
          ItemSeparatorComponent={ItemSeparatorView}
          numColumns={2}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['red', 'orange']}
              size="large"
              progressBackgroundColor={'transparent'}
              progressViewOffset={200}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default memo(HomeScreen);

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    width: '48%',
    height: 200,
    marginVertical: 5,
    marginRight: 10,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryContainer: {
    position: 'absolute',
    backgroundColor: '#000',
    width: 90,
    height: 30,
    borderBottomRightRadius: 15,
  },
  categoryText: {
    fontSize: 16,
    lineHeight: 30,
    color: '#fff',
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  },
  titleContainer: {
    marginVertical: 5,
    flexShrink: 1,
    height: '20%',
  },
  title: {
    marginVertical: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 5,
  },
  priceContainer: {
    height: '20%',
  },
  priceText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 20,
  },
});
