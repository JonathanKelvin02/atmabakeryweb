import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  MainBackGroundFiller: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    paddingLeft: 400,
    paddingRight: 400,
    backgroundColor: 'black',
  },
  MainPdfPageArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  RandomBox1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    backgroundColor: 'red',
  },
  RandomBox2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    backgroundColor: 'blue',
  },
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.MainBackGroundFiller}>
      <View style={styles.MainPdfPageArea}>
        <View style={styles.RandomBox1}>
          <Text>Box 1</Text>
        </View>
        <View style={styles.RandomBox2}>
          <Text>Box 2</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
