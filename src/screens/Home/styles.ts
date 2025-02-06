import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  actionButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modelsList: {
    padding: 20,
  },
  modelListCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
    elevation: 2,
    padding: 15,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  modelCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },
  modelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modelHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modelTitleContainer: {
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 10,
  },
  modelTitle: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  modelInfo: {
    width: '100%',
    marginTop: 5,
    paddingTop: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  infoColumn: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
    opacity: 0.8,
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 8,
    fontWeight: '500',
    textAlign: 'center',
  },
  resistenciaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ohmsLabel: {
    fontSize: 16,
    color: COLORS.text,
    marginRight: 4,
  },
  resistenciaValue: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 5,
    width: '100%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    height: 50,
  },
  picker: {
    height: 50,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  inputColumn: {
    flex: 1,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
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
  submitButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  modelName: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  modelDetails: {
    flexDirection: 'row',
    padding: 10,
  },
  wireColumn: {
    flex: 1,
  },
  wireLabel: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
  },
  wireValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ohmsContainer: {
    marginTop: 4,
  },
  ohmsValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  modelActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
  },
  actionIconButton: {
    padding: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 1,
  },
  iconButton: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
  },
  iconButtonText: {
    marginTop: 8,
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
  },
  fioInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  fioInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
  },
  tipoFioContainer: {
    width: 80,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    height: 40,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  tipoFioPicker: {
    height: 40,
    width: '100%',
  },
}); 