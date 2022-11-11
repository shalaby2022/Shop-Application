import React, {memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {decCounter, incCounter} from '../api/ShopSlice';

const FavouritesScreen = () => {
  const dispatch = useDispatch();
  const {favs, final} = useSelector(state => state.products);

  // dispatching increase more
  const plusItem = item => {
    dispatch(incCounter(item));
  };

  // dispatching decrease more
  const minusItem = item => {
    dispatch(decCounter(item));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#00000076'}}>
      <ScrollView>
        {favs.length > 0 ? (
          favs.map(fav => (
            <View key={fav.id} style={styles.itemContainer}>
              <Image
                source={{uri: fav.category.image}}
                style={{width: '50%', height: '70%', borderRadius: 5}}
              />
              <View style={styles.textContainer}>
                <TouchableOpacity
                  style={styles.btns}
                  onPress={() => plusItem(fav)}>
                  <FontAwesome name="plus" size={25} color={'blue'} />
                </TouchableOpacity>
                <Text style={styles.text}>{fav.count}</Text>
                <TouchableOpacity
                  style={styles.btns}
                  onPress={() => minusItem(fav)}>
                  <FontAwesome name="minus" size={25} color={'red'} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={{flex: 1, backgroundColor: '#000'}}>
            <Text
              style={{
                fontSize: 28,
                color: '#fff',
                textAlign: 'center',
                paddingVertical: '63%',
              }}>
              No Favourites &nbsp; 🤔
            </Text>
          </View>
        )}
        {favs.length > 0 && (
          <View style={styles.totalContainer}>
            <Text style={styles.total}>Total Price is : </Text>
            <Text style={styles.total}>{final} 💲</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(FavouritesScreen);

const styles = StyleSheet.create({
  itemContainer: {
    width: '95%',
    height: 200,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingHorizontal: 5,
    borderRadius: 7,
  },
  textContainer: {
    width: '30%',
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  btns: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f00',
  },
  totalContainer: {
    width: '95%',
    height: 40,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingHorizontal: 5,
    borderRadius: 7,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 10,
  },
});
