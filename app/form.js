import { Screen } from "../components/Screen";
import { Title } from "../components/Title";
import { AppText } from "../components/AppText";
import { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AppButton, AppInput } from "../components";
import { useTheme } from "../contexts/ThemeContext";
import { quotesApi } from "../services/api";
import { QuoteSchema, ReviewFormSchema } from "../schemas/apiSchemas";

export default function Formulaire() {
    const { colors } = useTheme();
    const [email, setEmail] = useState('');
    const [review, setReview] = useState('');

    const [quote, setQuote] = useState(null);
    const [quoteLoading, setQuoteLoading] = useState(false);
    const [quoteError, setQuoteError] = useState(null);

    // validation en live
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidReview = review.length >= 10;

    const showEmailError = email.length > 0 && !isValidEmail;
    const showReviewError = review.length > 0 && !isValidReview;

    const isFormValid = isValidEmail && isValidReview;

    //Zod
    const handleSubmit = () => {
        const result = ReviewFormSchema.safeParse({ email, review });

        if (!result.success) {
            console.error('Form validation failed:', result.error);
            alert('Veuillez corriger les erreurs');
            return;
        }

        console.log('Valid data:', result.data);
        setReview('');
        setEmail('');
        alert('Formulaire soumis avec succès !');
    };

    // Fetch quote de api
    const fetchQuote = async () => {
        setQuoteLoading(true);
        setQuoteError(null);
        try {
            const data = await quotesApi.getRandomQuote();

            // Validate avec Zod
            const result = QuoteSchema.safeParse(data);

            if (!result.success) {
                console.error('Quote validation error:', result.error);
                setQuoteError('Données invalides reçues de l\'API');
                setQuote(null);
            } else {
                setQuote(result.data);
            }
        } catch (err) {
            setQuoteError(err.message);
            setQuote(null);
        } finally {
            setQuoteLoading(false);
        }
    };

    return (
        <Screen scrollable={true}>
            <View style={{ gap: 36 }}>
                <Title>Laisser un avis</Title>

                <View>
                    <AppText>Email <AppText style={{ color: colors.error }}> *</AppText>
                    </AppText>
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
                    <AppText>Avis
                        <AppText style={{ color: colors.error }}> *</AppText>
                    </AppText>
                    <AppInput
                        value={review}
                        onChangeText={setReview}
                        placeholder="Review..."
                        showError={showReviewError}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        style={{ height: 100 }}
                    />

                    {showReviewError && (
                        <AppText style={{ color: colors.error, fontSize: 12 }}>
                            Le review doit contenir au moins 10 caractères
                        </AppText>
                    )}
                </View>

                <AppButton
                    disabled={!isFormValid}
                    onPress={handleSubmit}
                    title={isFormValid ? 'Soumettre' : 'Veuillez remplir les champs'}
                />

                <View style={{ 
                    height: 1, 
                    backgroundColor: colors.border,
                    marginVertical: 12,
                }} />

                <View style={{ gap: 16 }}>
                    <Title style={{ fontSize: 20 }}>☕ Besoin d'inspiration?</Title>
                    
                    <AppButton
                        onPress={fetchQuote}
                        title={quote ? "Nouvelle citation" : "Obtenir une citation"}
                    />

                    {quoteLoading && (
                        <View style={{ padding: 20, alignItems: 'center' }}>
                            <ActivityIndicator size="large" color={colors.primary} />
                            <AppText style={{ marginTop: 12 }}>Chargement...</AppText>
                        </View>
                    )}

                    {quoteError && (
                        <View style={{ 
                            padding: 16, 
                            backgroundColor: colors.error + '20',
                            borderRadius: 8,
                        }}>
                            <AppText style={{ color: colors.error }}>
                                 Erreur: {quoteError}
                            </AppText>
                        </View>
                    )}

                    {quote && !quoteLoading && (
                        <View style={{
                            padding: 20,
                            backgroundColor: colors.surface,
                            borderRadius: 12,
                            borderLeftWidth: 4,
                            borderLeftColor: colors.primary,
                        }}>
                            <AppText style={{ 
                                fontSize: 18, 
                                fontStyle: 'italic',
                                marginBottom: 12,
                                lineHeight: 26,
                            }}>
                                "{quote.content}"
                            </AppText>
                            <AppText style={{ 
                                fontSize: 14, 
                                color: colors.textSecondary,
                                textAlign: 'right',
                            }}>
                                — {quote.author}
                            </AppText>
                        </View>
                    )}
                </View>
            </View>
        </Screen>
    );
}