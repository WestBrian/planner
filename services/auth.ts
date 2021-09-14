import { auth, firestore } from '../services/firebase'
import { RegisterFormValues } from '../components/register-form'

export async function createUser(values: RegisterFormValues) {
  const { email, password } = values

  try {
    const userCredentials = await auth.createUserWithEmailAndPassword(
      email,
      password
    )
    if (userCredentials.user) {
      firestore.collection('users').doc(userCredentials.user.uid).set({})
    }
  } catch (e) {
    console.error(e)
  }
}

export async function signIn(values: { email: string; password: string }) {
  const { email, password } = values

  try {
    return await auth.signInWithEmailAndPassword(email, password)
  } catch (e) {
    console.error(e)
  }
}
