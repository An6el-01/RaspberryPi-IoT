import { StyleSheet } from "react-native";

const credentials = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
    width: '100%',
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFF",
    paddingBottom: 100,
  },
  input: {
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    width: '80%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  button: {
    backgroundColor: "#6C63FF",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default credentials;
