import React from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useFilter } from '../context/FilterContext';
import { Ionicons } from '@expo/vector-icons';

const statusOptions: ('All' | 'Completed' | 'Todo')[] = ['All', 'Completed', 'Todo'];
const priorityOptions: ('High' | 'Medium' | 'Low')[] = ['High', 'Medium', 'Low'];

const priorityColors = {
  High: {
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.15)',
    border: 'rgba(239, 68, 68, 0.3)',
    activeBg: '#ef4444',
  },
  Medium: {
    color: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.15)',
    border: 'rgba(59, 130, 246, 0.3)',
    activeBg: '#3b82f6',
  },
  Low: {
    color: '#94a3b8',
    bg: 'rgba(148, 163, 184, 0.15)',
    border: 'rgba(148, 163, 184, 0.3)',
    activeBg: '#64748b',
  },
};

export default function Filters() {
  const {
    filters: { search: searchText, status: filterStatus, priorities: filterPriorities },
    setSearchText,
    setStatusFilter,
    togglePriorityFilter,
  } = useFilter();

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  const handleStatusChange = (status: 'All' | 'Completed' | 'Todo') => {
    setStatusFilter(status);
  };

  const handlePriorityToggle = (priority: 'High' | 'Medium' | 'Low') => {
    togglePriorityFilter(priority);
  };

  return (
    <View style={styles.container}>
      {/* Search Filter */}
      <View style={styles.filterGroup}>
        <Text style={styles.label}>Search</Text>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={18}
            color="rgba(255, 255, 255, 0.4)"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search todos..."
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            value={searchText}
            onChangeText={handleSearchChange}
          />
          {searchText.length > 0 && (
            <Pressable onPress={() => handleSearchChange('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={18} color="rgba(255, 255, 255, 0.4)" />
            </Pressable>
          )}
        </View>
      </View>

      {/* Status Filter */}
      <View style={styles.filterGroup}>
        <Text style={styles.label}>Filter by Status</Text>
        <View style={styles.tabContainer}>
          {statusOptions.map((status) => {
            const isActive = filterStatus === status;
            return (
              <Pressable
                key={status}
                onPress={() => handleStatusChange(status)}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                  {status === 'Todo' ? 'To do' : status}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Priority Filter */}
      <View style={styles.filterGroup}>
        <Text style={styles.label}>Filter by Priority</Text>
        <View style={styles.priorityContainer}>
          {priorityOptions.map((priority) => {
            const isSelected = filterPriorities.includes(priority);
            const colors = priorityColors[priority];

            return (
              <Pressable
                key={priority}
                onPress={() => handlePriorityToggle(priority)}
                style={[
                  styles.priorityTag,
                  {
                    backgroundColor: isSelected ? colors.activeBg : colors.bg,
                    borderColor: colors.border,
                  },
                ]}
              >
                {isSelected && (
                  <Ionicons
                    name="checkmark-circle"
                    size={14}
                    color="#ffffff"
                    style={styles.tagCheckIcon}
                  />
                )}
                <Text
                  style={[
                    styles.priorityTagText,
                    { color: isSelected ? '#ffffff' : colors.color },
                  ]}
                >
                  {priority}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    marginBottom: 20,
  },
  filterGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#94a3b8',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
    height: '100%',
  },
  clearButton: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#6366f1',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  tagCheckIcon: {
    marginRight: 4,
  },
  priorityTagText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
