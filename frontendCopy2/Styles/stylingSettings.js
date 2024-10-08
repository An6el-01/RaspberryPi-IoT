import { StyleSheet } from "react-native";
export const settings = StyleSheet.create({
    
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        zIndex: -1,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(32, 21, 60, 0.5) 100%)",
    },
    content: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
   },
    title: {
      marginTop: 70,
      fontSize: 58,
      fontWeight: "bold",
      color: "#FFF",
      letterSpacing: -2.2,
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    zIndex: -1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(32, 21, 60, 0.5)",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 100,
  },
  title: {
    fontSize: 58,
    fontWeight: "bold",
    color: "#FFF",
    letterSpacing: -2.2,
    marginBottom: 40,
  },
  formContainer: {
    width: "80%",
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: "#FFF",
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#6C63FF",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
      backgroundColor: '#6C63FF',
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginHorizontal: 5,
      marginBottom: 20,
      elevation: 3, 
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
  turnOffButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
} 
);


