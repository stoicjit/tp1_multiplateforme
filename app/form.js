import { Screen } from "../components/Screen";
import { Title } from "../components/Title";
import { AppText } from "../components/AppText";
import { useState } from 'react';
import { View } from 'react-native';
import { AppButton, AppInput } from "../components";

export default function Formulaire() {
    const [email, setEmail] = useState('');
    const [review, setReview] = useState('');

    // Validation
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidReview = review.length >= 10;

    const showEmailError = email.length > 0 && !isValidEmail;
    const showReviewError = review.length > 0 && !isValidReview;

    const isFormValid = isValidEmail && isValidReview;

    const handleSubmit = () => {
        console.log('Submit:', { email, review });
        setReview('')
        setEmail('')
        alert('Formulaire soumis avec succès !');
        
    };

    return (
        <Screen>
            <View style={{ gap: 36 }}>
                <Title>Laisser un avis</Title>

                <View>
                    <AppText>Email <AppText style={{ color: "red" }}> *</AppText>
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
                        <AppText style={{ color: "#dc3545", fontSize: 12 }}>
                            Email invalide
                        </AppText>
                    )}
                </View>

                <View>
                    <AppText>Avis
                        <AppText style={{ color: "red" }}> *</AppText>
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
                        <AppText style={{ color: "#dc3545", fontSize: 12 }}>
                            Le nom doit contenir au moins 10 caractères
                        </AppText>
                    )}
                </View>

                <AppButton
                    disabled={!isFormValid}
                    onPress={handleSubmit}
                    title={isFormValid ? 'Soumettre' : 'Veuillez remplir les champs'}
                />
            </View>
        </Screen>
    );
}


