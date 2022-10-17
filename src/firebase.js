import firebase from "firebase";
import "firebase/firestore";
import { ref, onUnmounted } from "vue";

const config = {
  apiKey: "AIzaSyBwR22Q162Mty1nGSnmSmXYK15AdX7SAHM",
  authDomain: "test-vue-d8bb1.firebaseapp.com",
  projectId: "test-vue-d8bb1",
  storageBucket: "test-vue-d8bb1.appspot.com",
  messagingSenderId: "523151007589",
  appId: "1:523151007589:web:9f4b61cd7bd1feb3dfcb8c",
  measurementId: "G-ZSZHLHG1FN",
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const quotesCollection = db.collection("quotes");

//Create Quote
export const createQuote = (quote) => {
  //console.log(quote);
  return quotesCollection.add(quote);
};

//Get Execat Quote
export const getQuote = async (id) => {
  const quote = await quotesCollection.doc(id).get();
  return quote.exists ? quote.data() : null;
};

//Update the quote
export const updateQuote = (id, quote) => {
  return quotesCollection.doc(id).update(quote);
};

//Delete Quote
export const deleteQuote = (id) => {
  return quotesCollection.doc(id).delete();
};

//Get all Quotes
export const useLoadQuotes = () => {
  const quotes = ref([]);
  const close = quotesCollection.onSnapshot((snapshot) => {
    quotes.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  //console.log(quotes)
  return quotes;
};

export const UseLoadAuthorsGenre = () => {
  const authorgenre = ref([]);
  const close = quotesCollection.onSnapshot((snapshot) => {
    authorgenre.value = snapshot.docs.map((doc) => ({
      author: doc.data().Author,
      genre: doc.data().Genre,
    }));
  });
  onUnmounted(close);

  return authorgenre;
};
