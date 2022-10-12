import { StyleSheet } from "react-native";

export default StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'#036ffc'
    },
    header:{
        height:'5%',
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:'5%',
        marginTop:'3%',
    },
    headerText:{
        fontSize:18,
        color:'#fff'
        // fontWeight:'bold',
    },
    mainText:{
        position:'absolute',
        alignSelf:'center',
        marginTop:'50%',
        color:'#fff',
        fontWeight:'bold',
        fontSize:30
    },
    mainComponent:{
        flex:1,
        alignItems:'flex-end',
        justifyContent:'space-between',
        paddingBottom:'20%',
        flexDirection:"row",
        paddingHorizontal:"5%"
    },
    button:{
        height:70,
        width:70,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:35,
        borderColor:"#fff",
    }
})