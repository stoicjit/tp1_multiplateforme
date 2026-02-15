import { View, Pressable, Alert, Platform } from 'react-native';
import { AppText } from '../../components/AppText';
import { useTheme } from '../../contexts/ThemeContext';

export function ReviewItem({ review, onEdit, onDelete }) {
  const { colors } = useTheme();

  const handleDelete = () => {
    if (Platform.OS === 'web') {
      // Use browser's native confirm dialog on web
      const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet avis ?');
      if (confirmed) {
        onDelete(review.id);
      }
    } else {
      // Use React Native Alert on mobile
      Alert.alert(
        'Confirmer la suppression',
        'Êtes-vous sûr de vouloir supprimer cet avis ?',
        [
          { text: 'Annuler', style: 'cancel' },
          { 
            text: 'Supprimer', 
            style: 'destructive',
            onPress: () => onDelete(review.id)
          },
        ]
      );
    }
  };

  const renderStars = () => {
    return '⭐'.repeat(review.rating);
  };

  return (
    <View style={{
      padding: 16,
      marginVertical: 8,
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
    }}>
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
      }}>
        <AppText style={{ fontWeight: 'bold', fontSize: 16 }}>
          {review.username}
        </AppText>
        <AppText style={{ fontSize: 16 }}>
          {renderStars()}
        </AppText>
      </View>

      <AppText style={{ 
        marginBottom: 8,
        lineHeight: 22,
      }}>
        {review.review}
      </AppText>

      <AppText style={{ 
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 12,
      }}>
        {review.email}
      </AppText>

      <View style={{ 
        flexDirection: 'row', 
        gap: 12,
        justifyContent: 'flex-end',
      }}>
        <Pressable
          onPress={() => onEdit(review)}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: colors.primary + '20',
            borderRadius: 6,
          }}
        >
          <AppText style={{ color: colors.primary, fontWeight: '600' }}>
            ✏️ Modifier
          </AppText>
        </Pressable>
        
        <Pressable
          onPress={handleDelete}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: colors.error + '20',
            borderRadius: 6,
          }}
        >
          <AppText style={{ color: colors.error, fontWeight: '600' }}>
            🗑️ Supprimer
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}