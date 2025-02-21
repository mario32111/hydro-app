import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#333',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingText: {
    fontSize: 18,
    color: '#333',
  },
  sectionHeader: {
    marginTop: 30,
    marginBottom: 10,
  },
  sectionToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionToggleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subSectionContainer: {
    paddingLeft: 20,
  },
  logoutButton: {
    marginTop: 40,
    paddingVertical: 15,
    backgroundColor: '#93C21A',
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
