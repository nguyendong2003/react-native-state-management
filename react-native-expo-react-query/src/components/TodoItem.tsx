import React from 'react';
import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleTodoStatus } from '../api/todoApi';

interface TodoItemProps {
  id: string;
  name: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

const priorityConfig = {
  High: {
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.15)',
    border: 'rgba(239, 68, 68, 0.3)',
  },
  Medium: {
    color: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.15)',
    border: 'rgba(59, 130, 246, 0.3)',
  },
  Low: {
    color: '#94a3b8',
    bg: 'rgba(148, 163, 184, 0.15)',
    border: 'rgba(148, 163, 184, 0.3)',
  },
};

export default function TodoItem({ id, name, completed, priority }: TodoItemProps) {
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: toggleTodoStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleToggle = () => {
    if (toggleMutation.isPending) return;
    toggleMutation.mutate(id);
  };

  const currentPriority = priorityConfig[priority] || priorityConfig.Low;

  return (
    <Pressable
      onPress={handleToggle}
      disabled={toggleMutation.isPending}
      style={({ pressed }) => [
        styles.container,
        completed && styles.containerCompleted,
        pressed && styles.containerPressed,
        toggleMutation.isPending && styles.containerPending,
      ]}
    >
      <View style={styles.leftSection}>
        <View
          style={[
            styles.checkbox,
            completed && styles.checkboxChecked,
            { borderColor: completed ? '#6366f1' : 'rgba(255, 255, 255, 0.3)' },
          ]}
        >
          {toggleMutation.isPending ? (
            <ActivityIndicator size="small" color="#6366f1" />
          ) : completed ? (
            <Ionicons name="checkmark" size={16} color="#ffffff" />
          ) : null}
        </View>

        <Text style={[styles.nameText, completed && styles.nameTextCompleted]}>
          {name}
        </Text>
      </View>

      <View
        style={[
          styles.badge,
          {
            backgroundColor: currentPriority.bg,
            borderColor: currentPriority.border,
          },
        ]}
      >
        <Text style={[styles.badgeText, { color: currentPriority.color }]}>
          {priority}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  containerCompleted: {
    opacity: 0.6,
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    borderColor: 'rgba(255, 255, 255, 0.03)',
  },
  containerPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  containerPending: {
    opacity: 0.4,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#6366f1',
  },
  nameText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '500',
  },
  nameTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
