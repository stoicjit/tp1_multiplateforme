import { Screen } from "../components/Screen";
import { Title } from "../components/Title";
import { AppText } from "../components/AppText";
import { useState, useEffect } from 'react';
import { View, ActivityIndicator, FlatList, Alert, Platform, Pressable } from 'react-native';
import { AppButton, AppInput } from "../components";
import { useTheme } from "../contexts/ThemeContext";
import { useRouter, useLocalSearchParams } from "expo-router";
import { reviewsApi } from "../services/reviewsApi";
import { ReviewFormSchema } from "../schemas/reviewSchemas";
import { ReviewItem } from "../features/reviews/ReviewItem";

export default function ReviewsForm() {
  const { colors } = useTheme();
  const router = useRouter();
  const { id: editId } = useLocalSearchParams();
  
  // Form state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Reviews list state
  const [reviews, setReviews] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState(null);

  // Validation states
  const isValidUsername = username.length >= 2;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidReview = review.length >= 10;
  const isValidRating = rating >= 1 && rating <= 5;

  const showUsernameError = username.length > 0 && !isValidUsername;
  const showEmailError = email.length > 0 && !isValidEmail;
  const showReviewError = review.length > 0 && !isValidReview;

  const isFormValid = isValidUsername && isValidEmail && isValidReview && isValidRating;

  const isEditMode = !!editId;

  // Fetch tout les reviews
  const fetchReviews = async () => {
    setListLoading(true);
    setListError(null);
    
    const result = await reviewsApi.getAllReviews();
    
    if (result.error) {
      setListError(result.error);
      setReviews([]);
    } else {
      setReviews(result.data || []);
    }
    
    setListLoading(false);
  };

  // Fetch un review pour edit
  const fetchReviewForEdit = async () => {
    if (!editId) return;
    
    setFormLoading(true);
    const result = await reviewsApi.getReviewById(editId);
    
    if (result.error) {
      Alert.alert('Erreur', result.error);
      router.push('/form');
    } else if (result.data) {
      setUsername(result.data.username);
      setEmail(result.data.email);
      setRating(result.data.rating);
      setReview(result.data.review);
    }
    
    setFormLoading(false);
  };

  useEffect(() => {
    if (isEditMode) {
      fetchReviewForEdit();
    } else {
      fetchReviews();
    }
  }, [editId]);

  const handleSubmit = async () => {
    const formData = { username, email, rating, review };
    const validation = ReviewFormSchema.safeParse(formData);

    if (!validation.success) {
      console.error('Form validation failed:', validation.error);
      Alert.alert('Erreur', 'Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    setFormLoading(true);

    let result;
    if (isEditMode) {
      result = await reviewsApi.updateReview(editId, validation.data);
    } else {
      result = await reviewsApi.createReview(validation.data);
    }

    setFormLoading(false);

    if (result.error) {
      Alert.alert('Erreur', result.error);
    } else {
      if (isEditMode) {
        router.push('/form');
        if (Platform.OS !== 'web') {
          Alert.alert('Succès', 'Avis modifié avec succès !');
        }
      } else {
        setUsername('');
        setEmail('');
        setRating(5);
        setReview('');
        
        await fetchReviews();
        
        if (Platform.OS !== 'web') {
          Alert.alert('Succès', 'Avis soumis avec succès !');
        }
      }
    }
  };


  const handleEdit = (reviewToEdit) => {
    router.push(`/form?id=${reviewToEdit.id}`);
  };


  const handleDelete = async (reviewId) => {
    const result = await reviewsApi.deleteReview(reviewId);
    
    if (result.error) {
      Alert.alert('Erreur', result.error);
    } else {
      await fetchReviews();
      
      if (Platform.OS !== 'web') {
        Alert.alert('Succès', 'Avis supprimé avec succès !');
      }
    }
  };

  const renderStarSelector = () => {
    return (
      <View style={{ flexDirection: 'row', gap: 8, marginVertical: 8 }}>
        {[1, 2, 3, 4, 5].map(star => (
          <Pressable
            key={star}
            onPress={() => setRating(star)}
            style={{
              padding: 8,
              backgroundColor: star <= rating ? colors.primary + '20' : colors.surface,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: star <= rating ? colors.primary : colors.border,
            }}
          >
            <AppText style={{ fontSize: 24 }}>
              {star <= rating ? '⭐' : '☆'}
            </AppText>
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <Screen scrollable={true}>
      <View style={{ gap: 24 }}>
        <Title>{isEditMode ? 'Modifier l\'avis' : 'Laisser un avis'}</Title>

        {formLoading && isEditMode && (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}

        {!formLoading && (
          <>
            <View>
              <AppText>Nom d'utilisateur <AppText style={{ color: colors.error }}> *</AppText></AppText>
              <AppInput
                value={username}
                onChangeText={setUsername}
                placeholder="Votre nom"
                showError={showUsernameError}
              />
              {showUsernameError && (
                <AppText style={{ color: colors.error, fontSize: 12 }}>
                  Le nom doit contenir au moins 2 caractères
                </AppText>
              )}
            </View>

            <View>
              <AppText>Email <AppText style={{ color: colors.error }}> *</AppText></AppText>
              <AppInput
                value={email}
                onChangeText={setEmail}
                placeholder="exemple@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                showError={showEmailError}
              />
              {showEmailError && (
                <AppText style={{ color: colors.error, fontSize: 12 }}>
                  Email invalide
                </AppText>
              )}
            </View>

            <View>
              <AppText>Note <AppText style={{ color: colors.error }}> *</AppText></AppText>
              {renderStarSelector()}
            </View>

            <View>
              <AppText>Avis <AppText style={{ color: colors.error }}> *</AppText></AppText>
              <AppInput
                value={review}
                onChangeText={setReview}
                placeholder="Votre avis..."
                showError={showReviewError}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                style={{ height: 100 }}
              />
              {showReviewError && (
                <AppText style={{ color: colors.error, fontSize: 12 }}>
                  L'avis doit contenir au moins 10 caractères
                </AppText>
              )}
            </View>

            <AppButton
              disabled={!isFormValid || formLoading}
              onPress={handleSubmit}
              title={
                formLoading 
                  ? 'Envoi...' 
                  : isFormValid 
                    ? (isEditMode ? 'Modifier' : 'Soumettre')
                    : 'Veuillez remplir tous les champs'
              }
            />

            {isEditMode && (
              <AppButton
                onPress={() => router.push('/form')}
                title="Annuler"
              />
            )}
          </>
        )}

        {!isEditMode && (
          <>
            <View style={{ 
              height: 1, 
              backgroundColor: colors.border,
              marginVertical: 12,
            }} />

            <Title style={{ fontSize: 20 }}>📝 Avis des clients</Title>

            {listLoading && (
              <View style={{ padding: 20, alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.primary} />
                <AppText style={{ marginTop: 12 }}>Chargement des avis...</AppText>
              </View>
            )}

            {listError && (
              <View style={{ 
                padding: 16, 
                backgroundColor: colors.error + '20',
                borderRadius: 8,
              }}>
                <AppText style={{ color: colors.error, marginBottom: 12 }}>
                  ❌ Erreur: {listError}
                </AppText>
                <AppButton title="Réessayer" onPress={fetchReviews} />
              </View>
            )}

            {!listLoading && !listError && (
              <FlatList
                data={reviews}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ReviewItem
                    review={item}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )}
                ListEmptyComponent={
                  <AppText style={{ textAlign: 'center', marginTop: 20 }}>
                    Aucun avis pour le moment. Soyez le premier à en laisser un !
                  </AppText>
                }
                scrollEnabled={false}
              />
            )}
          </>
        )}
      </View>
    </Screen>
  );
}