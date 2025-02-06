import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 15,
  },
  producaoContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: COLORS.text,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  columnHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  modeloHeader: {
    width: '35%',
  },
  metaHeader: {
    width: '15%',
  },
  marchaHeader: {
    width: '20%',
  },
  testeHeader: {
    width: '20%',
  },
  restanteHeader: {
    width: '15%',
  },
  statusHeader: {
    width: '10%',
  },
  deleteHeader: {
    width: '8%',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    height: 60,
  },
  modeloCell: {
    width: '35%',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 2,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metaCell: {
    width: '15%',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputCell: {
    width: '20%',
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginHorizontal: 1,
    fontSize: 14,
    paddingVertical: 0,
    justifyContent: 'center',
  },
  restanteCell: {
    width: '15%',
    fontSize: 12,
    textAlign: 'center',
  },
  statusCell: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  deleteButton: {
    width: '8%',
    alignItems: 'center',
    padding: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.danger,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 8,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  inputColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButton: {
    padding: 5,
  },
  horaHeader: {
    width: '30%',
  },
  realHeader: {
    width: '20%',
  },
  totalHeader: {
    width: '20%',
  },
  acoesHeader: {
    width: '10%',
  },
  horaCell: {
    width: '30%',
    fontSize: 12,
    textAlign: 'center',
  },
  realCell: {
    width: '20%',
    fontSize: 12,
    textAlign: 'center',
  },
  totalCell: {
    width: '20%',
    fontSize: 12,
    textAlign: 'center',
  },
  detalhesButton: {
    width: '10%',
    backgroundColor: COLORS.primary,
    padding: 6,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detalhesButtonText: {
    color: '#fff',
    fontSize: 10,
  },
  detalhesContent: {
    marginBottom: 20,
  },
  detalheText: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  picker: {
    height: 50,
    width: '100%',
    color: COLORS.text,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 5,
  },
  detalhesModalContent: {
    width: '80%',
    maxWidth: 300,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  okButton: {
    alignSelf: 'center',
    width: '50%',
    marginTop: 10,
  },
}); 