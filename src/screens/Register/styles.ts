import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 16,
  },
  form: {
    gap: 16,
  },
  input: {
    height: 56,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    padding: 16,
    fontSize: 16,
  },
}); 