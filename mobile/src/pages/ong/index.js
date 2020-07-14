import React, { useState, useEffect } from 'react';
import { Feather, a } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity} from 'react-native';

import api from '../../services/api'

import logoImg from '../../assets/logo.png'
import styles from './styles'


export default function Ong() {
    const[incidents, setIncidents] = useState([]);

    const[total, setTotal] = useState(0);
    const[page, setPage] = useState(1);
    const[loading,setLoading]= useState(false)

    const navigation = useNavigation()

    function navigateToDetail(incident){
        navigation.navigate('Detail', { incident });
    }
    function navigateBack(){
        navigation.goBack()
    }
 
    async function loadIncidents(){
        if(loading){
            return;
        }

        if(total>0 && incidents.length == total){
            return;
        }

        setLoading(true);



        const response = await api.get('incidents', {
            params: {page}
        });

        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);

    }

    useEffect(() => {
        loadIncidents();  
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />

                </TouchableOpacity>
            </View>

            <View style={styles.information}>
                <View style={styles.group}>
                    <Text style={styles.item} >Nome:</Text>
                    <Text style={styles.item} >APAD</Text>
                </View>
                <View style={styles.group}>
                    <Text style={styles.item} >Email:</Text>
                    <Text style={styles.item} >Apad@gmail.com</Text>
                </View>
                <View style={styles.group}>
                    <Text style={styles.item} >Whatsapp:</Text>
                    <Text style={styles.item} >11963213421</Text>
                </View>
                <View style={styles.group}>
                    <Text style={styles.item} >Cidade:</Text>
                    <Text style={styles.item} >SP</Text>
                </View>
                <View style={styles.group}>
                    <Text style={styles.item} >Estado</Text>
                    <Text style={styles.item} >SP</Text>
                </View>
                
            </View>

            <Text style={styles.casos}>Casos de APAD:</Text>

            <FlatList 
            data={incidents}
            style={styles.incidentList}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator = {true}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.2}
            renderItem={({ item: incident }) => (
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>
                    
                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>

                    <TouchableOpacity 
                    style={styles.detailsButton}
                    onPress={() => navigateToDetail(incident) }
                    >
                        <Text style={styles.detailsButtonText}> Ver mais detalhes </Text>
                        <Feather name="arrow-right" size={16} color="red" />
                    </TouchableOpacity>
                </View> 
            )} 

            />




        </View>     
    )
}


