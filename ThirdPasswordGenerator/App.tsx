import React, { useState } from 'react'
import { 
  SafeAreaView,
  ScrollView,
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from 'react-native'

import BouncyCheckbox from "react-native-bouncy-checkbox"

// For Form validation only
import * as Yup from 'yup'
import { Formik } from 'formik'
const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4, "Password must contain atleast 4 characters.")
  .max(16, "Password should be less than 16 characters")
  .required("Length is required")
})



export default function App() {
  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)

  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
    let charList =  '';

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitsChars = '0123456789';
    const symbolChars = '!@#%^&*()_+';

    if(upperCase){
      charList += uppercaseChars;
    }
    if(lowerCase){
      charList += lowercaseChars;
    }
    if(numbers){
      charList += digitsChars;
    }
    if(symbols){
      charList += symbolChars;
    }

    const passwordResult = createPassword(charList,passwordLength);

    setPassword(passwordResult);
    setIsPassGenerated(true);
  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = ''
    for(let i = 0; i< passwordLength; i++){
      const charIndex = Math.round(Math.random()*characters.length)
      result += characters.charAt(charIndex)
    }

    return result;
  }

  const resetPassword = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setSymbols(false);
    setNumbers(false);
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={(values) => {
              console.log(values)
              // Two ways to convert passwordLength string to number
              // generatePasswordString(Number(values.passwordLength))
              generatePasswordString(+values.passwordLength)
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,            
              /* and other goodies */
            }) => (
              <>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text style={styles.heading}>Password Length</Text>
                  {touched.passwordLength && errors.passwordLength && (
                    <Text style={styles.errorText}>
                      {errors.passwordLength}
                    </Text>
                  )}
                </View>
                <TextInput 
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder='ex. 8'
                    keyboardType='numeric'
                  />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include lowercase</Text>
                <BouncyCheckbox 
                  disableBuiltInState
                  isChecked={lowerCase}
                  onPress={() => setLowerCase(!lowerCase)}
                  fillColor='#29AB87'
                />
              </View>
              <View style={styles.inputWrapper}></View>
              <View style={styles.inputWrapper}></View>
              <View style={styles.inputWrapper}></View>

              <View style={styles.formActions}>
                <TouchableOpacity>
                  <Text>Generate Password</Text>
                </TouchableOpacity>
    
                <TouchableOpacity>
                  <Text>Reset</Text>
                </TouchableOpacity>
              </View>
              </>
            )}

</Formik>
        </View>
      </SafeAreaView>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
})