import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const[values , setValues] = useState(new Array(9).fill(null));
  const[isXTurn , setIsXTurn] = useState(true);
  const[winner , setWinner] = useState(null);
  const[score1 , setScore1] = useState(0);
  const[score2 , setScore2] = useState(0);
  const[gameEnded , setGameEnded] = useState(false);

  const assignValues = (index) =>{
    const copy = [...values];
    if(copy[index]=== null){
      copy[index] = isXTurn  ? 'X' : 'O';
      setIsXTurn(!isXTurn);
      setValues(copy);
    }
  }
  useEffect(()=>{
    const winningLogic = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for(let logic of winningLogic){
      let[a,b,c] = logic;
      if(values[a] !== null && values[a] === values[b] && values[a] === values[c]){
        if( values[a] === 'X'){
          setWinner('Player 1');
          setGameEnded(true);
        }
        else{
          setWinner('Player 2');
          setGameEnded(true);
        }
      }
      
    }
  },[values]);

  useEffect(() => {
    if (winner !== null && gameEnded) {
      Alert.alert(
        'Ends',
        `${winner} wins`,
        [
          {
            text: 'Next Match',
            onPress: () => {
              const initialBoard = new Array(9).fill(null);
              setGameEnded(false);
              if (winner === 'Player 1') {
                setScore1(prev => prev + 1);
              } else if (winner === 'Player 2') {
                setScore2(prev => prev + 1);
              }
              setValues(initialBoard);
              setIsXTurn(true);
              setWinner(null);
            },
          },
        ],
      );
    }
  }, [winner, gameEnded, setValues, setIsXTurn, setWinner, setScore1, setScore2]);

  useEffect(()=>{
    if(values.indexOf(null) === -1 && winner === null){
      setGameEnded(true)
      Alert.alert(
        'Match Draw',
        'Start a new rematch',
        [
          {
            text:'Start a new rematch',
            onPress:() =>{
              const initialBoard = new Array(9).fill(null);
              setValues(initialBoard);
              setIsXTurn(true);
              setGameEnded(false);
              setWinner(null);
            }
          }
        ]
      )
    }
  })

  const restartMatch = () =>{
    setIsXTurn(true)
    const initialBoard = new Array(9).fill(null);
    setValues(initialBoard);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.mainBox}>
        {values.map((value,index) => (
          <TouchableOpacity activeOpacity={0.5} onPress={() => assignValues(index)} style={styles.individual} key={index}>
            <Text style={[styles.marks , {color : value === 'X'? 'red' :'#18b7e2' } ]}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.scoreCard}>
        <View>
          <Text style={styles.scoreCardText}>Player 1</Text>
          <Text style={styles.scoreCardText}>{score1}</Text>
        </View>
        <View>
          <Text style={styles.scoreCardText}>Player 2</Text>
          <Text style={styles.scoreCardText}>{score2}</Text>
        </View>
      </View>
      <View style={styles.restartView}>
        <TouchableOpacity activeOpacity={0.5} style={[styles.restartView ,styles.btn ]} onPress={()=>restartMatch()}>
          <Text style={styles.btnText}>Restart</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" backgroundColor='orange' />
    </View>
  );
}

const styles = StyleSheet.create({
  title:{
    color:'white',
    fontSize:40,
    fontWeight:'bold'
  },
  container: {
    flex: 1,
    backgroundColor: '#101010',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainBox:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    height:'50%',
    width:'80%',
    flexWrap:'wrap'
  },
  individual:{
    height:'33%',
    width:'33%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderColor:'white',
    borderWidth:2
  },
  marks:{
    fontSize:60,
    fontWeight:'400'
  },
  scoreCard:{
    display:'flex',
    flexDirection:'row',
    width:'80%',
    alignItems:'center',
    justifyContent:'space-around'
  },
  scoreCardText:{
    color:'white',
    textAlign:'center',
    fontSize:24
  },
  restartView:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:'100vw'
  },
  btn:{
    padding:10,
    backgroundColor:'orange',
    borderRadius:5
  },
  btnText:{
    fontSize:18,
    fontWeight:'bold'
  }
});
