import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
    border: '1px solid black',
  },
  content: {
  
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
  },
  section: {
    marginBottom: 10,
    paddingBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Helvetica-Bold',
  },
  text: {
    marginBottom: 5,
  },
  operation: {
    marginTop: 5,
    padding: 10,
    border:'1px solid black',

  },
  materialContainer: {
    marginBottom: 10,
  },
  rawAndOp:{
    padding:10,
    margin:'5',
    border:'1px solid black',
  }
});

const ProductPDF = ({ product }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.header}>Ruta</Text>
        {product.ruteToFollow && product.ruteToFollow.rawMaterials.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Información:</Text>
            {product.ruteToFollow.rawMaterials.map((rawMaterial) => (
              <View key={rawMaterial.rawMaterialId._id} style={styles.rawAndOp}>
                <Text style={styles.text}>
                  {`${rawMaterial.rawMaterialId.shape} - ${rawMaterial.rawMaterialId.material} - Diámetro Externo: ${rawMaterial.rawMaterialId.externalDiameter || 'no'} - Diámetro Interno: ${rawMaterial.rawMaterialId.internalDiameter || 'no'} - Nº Cortes: ${rawMaterial.cantidadDeCortes || 'no'}`}
                </Text>
                {rawMaterial.operationsToFollow.map((operation) => (
                  <View key={operation._id} style={styles.operation}>
                    <Text style={styles.text}>Operación: {operation.operationId.name}</Text>
                    <Text style={styles.text}>Notas: {operation.notes}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
);

export default ProductPDF;
