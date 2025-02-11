import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 15,
    flex: 1,
  },
  producaoContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
    width: '40%',
  },
  metaHeader: {
    width: '12%',
  },
  marchaHeader: {
    width: '15%',
  },
  testeHeader: {
    width: '15%',
  },
  recuperadoHeader: {
    width: '15%',
  },
  restanteHeader: {
    width: '12%',
  },
  statusHeader: {
    width: '15%',
  },
  deleteHeader: {
    width: '10%',
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
    width: '40%',
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
    width: '15%',
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
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  deleteButton: {
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalScroll: {
    width: '100%',
    maxHeight: '90%',
  },
  modalScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    elevation: 5,
    alignSelf: 'center',
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
    gap: 12,
    marginBottom: 15,
  },
  inputColumn: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    height: 50,
    backgroundColor: '#f5f5f5',
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
    width: '35%',
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
    padding: 8,
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
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
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
    width: '90%',
    maxWidth: 400,
    paddingHorizontal: 20,
    paddingVertical: 15,
    maxHeight: '80%',
  },
  okButton: {
    alignSelf: 'center',
    width: '50%',
    marginTop: 10,
  },
  timePickerButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  timePickerButtonDisabled: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
  },
  timePickerText: {
    fontSize: 14,
    color: COLORS.text,
  },
  timePickerTextDisabled: {
    color: '#999',
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  timePickerColumn: {
    alignItems: 'center',
    width: '40%',
  },
  timePickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.text,
  },
  timePickerScroll: {
    height: 200,
    width: '100%',
  },
  timeOption: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  timeOptionText: {
    fontSize: 16,
    color: COLORS.text,
  },
  timeOptionSelected: {
    backgroundColor: COLORS.primary + '20',
    borderColor: COLORS.primary,
  },
  timeOptionTextSelected: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  timePreview: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  modalButtonDisabled: {
    opacity: 0.5,
  },
  paradaContainer: {
    marginBottom: 20,
  },
  codigoInput: {
    marginBottom: 10,
  },
  descricaoInput: {
    marginBottom: 10,
    minHeight: 60,
  },
  addParadaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginTop: 10,
  },
  addParadaText: {
    color: COLORS.primary,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  paradasList: {
    marginTop: 20,
    marginBottom: 20,
  },
  paradasHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  paradasTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  minutosInfo: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paradaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 8,
  },
  paradaInfo: {
    flex: 1,
  },
  paradaCodigo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  paradaDescricao: {
    fontSize: 14,
    color: COLORS.text,
    marginTop: 4,
  },
  removeParadaButton: {
    padding: 5,
  },
  detalheParada: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  detalheHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  detalheTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  detalheMinutos: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  detalheLine: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detalheLabel: {
    fontSize: 14,
    color: COLORS.text,
    width: 80,
    fontWeight: '500',
  },
  detalheValue: {
    fontSize: 14,
    color: COLORS.text,
    flex: 1,
  },
  detalhesTotalInfo: {
    backgroundColor: COLORS.primary + '15',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  detalhesTotalLabel: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 5,
  },
  detalhesTotalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  addFirstParadaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 20,
  },
  addFirstParadaText: {
    color: COLORS.primary,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  paradasContainer: {
    marginBottom: 20,
  },
  acoesContainer: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  editButton: {
    padding: 8,
  },
  deleteHoraButton: {
    padding: 6,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  paradaMinutos: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: 'bold',
    marginTop: 4,
  },
  minutosInfoDisabled: {
    fontSize: 14,
    color: COLORS.disabled,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  addFirstParadaTextDisabled: {
    color: COLORS.disabled,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    elevation: 2,
    gap: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  clearButtonText: {
    color: COLORS.danger,
    fontSize: 14,
    fontWeight: '500',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  exportButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 6,
    elevation: 2,
    gap: 4,
    marginTop: 16,
  },
  exportButtonText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  filterContainer: {
    marginBottom: 20,
  },
  dateRow: {
    marginBottom: 12,
  },
  pickerRow: {
    flexDirection: 'row',
    gap: 12,
  },
  pickerColumn: {
    flex: 1,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    height: 50,
    backgroundColor: '#fff',
  },
  dateButtonText: {
    fontSize: 14,
    color: COLORS.text,
  },
  acoesButton: {
    padding: 8,
    width: '15%',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  acoesModalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    width: '80%',
    maxWidth: 300,
  },
  acaoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  acaoButtonDanger: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  acaoText: {
    fontSize: 16,
    color: COLORS.text,
  },
  acaoTextDanger: {
    color: COLORS.danger,
  },
  timeText: {
    fontSize: 16,
    color: COLORS.text,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    backgroundColor: COLORS.background,
  },
}); 