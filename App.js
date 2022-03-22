import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Button, FlatList, Image, View, StyleSheet, ActivityIndicator } from 'react-native';


const App = () => {
	const [ loading, setLoading] = useState(false);
	const [ movies, setMovies] = useState([]);

	useEffect(() =>{
		const requestMovies = async () => {
			setLoading(true);
			const req = await fetch('https://api.b7web.com.br/cinema/');
			const json = await req.json();
		
			if(json) {
				setMovies(json);
			}
			setLoading(false);
		}
		requestMovies();
	},[]);

	return (
		<SafeAreaView style={styles.container}>
			
			{loading && 
				<View style={styles.loadingArea}>
					<ActivityIndicator size="large" color= "#FFFFFF"/>
					<Text style={styles.loadingText}>Loading...</Text>
				</View>
			
			
			}
			
			{!loading && 
				<>
					<Text style={styles.totalMoviesText}>Total de Filmes: {movies.length}</Text>

					<FlatList
						style={styles.flatList}
						data={movies}
						renderItem={({item}) => (
							<View style={styles.moviesItem}>
								<Image 
									source={{uri: item.avatar}}  
									style={styles.moviesImage}
									resizeMode="contain"
								/>
								<Text  style={styles.moviesTitle} >{item.titulo}</Text>
							</View>
						)}
						keyExtractor={item=> item.titulo}
					/>
				</>
			}
			
			
    	</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: "#333",
		paddingTop:20
	},
	totalMoviesText: {
		color: "#FFF",
		fontSize: 18,
		textAlign: 'center',
		marginTop:10,
		marginBottom: 10
	},
	flatList: {
		flex:1,
	},
	moviesItem: {
		marginBottom: 30
	},
	moviesImage: {
		height: 400
	},
	moviesTitle: {
		color: '#FFF',
		fontSize: 24,
		textAlign: 'center',
		marginTop: 5,
	},
	loadingArea: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	loadingText: {
		color: "#FFF"
	},
});

export default App;