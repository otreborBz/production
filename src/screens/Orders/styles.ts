import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  createButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    margin: 20,
  },
  createButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listHeader: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: '#f8f9fa',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center', // Centraliza o texto do cabeçalho
  },
  actionsHeader: {
    width: 80, // Espaço para os ícones de ação
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  orderColumn: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    paddingHorizontal: 4,
    textAlign: 'center', // Centraliza o texto das colunas
  },
  modelColumn: {
    flex: 1.5,
    fontSize: 14,
    color: COLORS.text,
    paddingHorizontal: 4,
    textAlign: 'center', // Centraliza o texto das colunas
    justifyContent: 'center', // Adicionado para centralizar verticalmente
  },
  quantityColumn: {
    flex: 0.8,
    fontSize: 14,
    color: COLORS.text,
    textAlign: 'center', // Centraliza o texto das colunas
    justifyContent: 'center', // Adicionado para centralizar verticalmente
  },
  orderActions: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'flex-end',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
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
    width: '100%',
    maxWidth: 400,
    elevation: 5,
    alignSelf: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    height: 50,
    width: '100%',
    marginBottom: 15,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#f5f5f5',
    color: COLORS.text,
    marginLeft: -8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    height: 50,
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
    width: '100%',
  },
  inputColumn: {
    flex: 1,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  modeloInfo: {
    marginTop: 20,
    padding: 15,
  },
  modeloTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.text,
  },
  modeloCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },
  modeloText: {
    fontSize: 16,
    marginBottom: 5,
    color: COLORS.text,
  },
  fiosContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fioInfo: {
    flex: 1,
    padding: 10,
  },
  fioTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.text,
  },
  createButtonContainer: {
    padding: 20,
    backgroundColor: '#fff',
    elevation: 4,
  },
  fabButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    elevation: 2,
    position: 'absolute',
    left: 20,
    bottom: 20,
    gap: 8,
  },
  clearButtonText: {
    color: COLORS.danger,
    fontSize: 14,
    fontWeight: '500',
  },
});