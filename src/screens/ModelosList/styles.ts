import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  listContent: {
    paddingTop: 20,
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
  modelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
    textAlign: 'center',
  },
  modelInfo: {
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  infoColumn: {
    flex: 1,
    alignItems: 'center',
  },
  infoHeader: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 8,
    fontWeight: '500',
  },
  infoModeloFio: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 8,
    fontWeight: 'bold',
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
}); 