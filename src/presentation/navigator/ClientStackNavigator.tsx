import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClientCategoryListScreen from "../views/client/category/list/CategoryList";
import { CategoryState } from "./AdminCategoryNavigator";
import ClientProductListScreen from "../views/client/product/list/ProductList";
import { Category } from "../../domain/entity/category";
import { ProductState } from "./AdminProductNavigator";
import ClientProductDetailScreen from "../views/client/product/detail/ProductDetail";
import { Product } from "../../domain/entity/product";
import { ProviderProps } from "./MainStackNavigator";
import { ShoppingBagProvider } from "../context/shopping/ShoppingProvider";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import ShoppingBagListScreen from "../views/client/shopping_bag/ShoppingBag";
import AddressListScreen from "../views/client/address/list/AddressList";
import ClientAddressCreateScreen from "../views/client/address/create/AddressCreate";
import ClientAddressMapScreen from "../views/client/address/map/AddressMap";
import { PlacesProvider } from "../context/place/PlaceProvider";
import ClientPaymentFormScreen from "../views/client/payment/form/PaymentForm";
import ClientPaymentsInstallmentsScreen from "../views/client/payment/installments/PaymentsInstallments";
import { ResponseMercadoPagoCardToken } from "../../data/source/remote/models/ResponseMercadoPagoCardToken";
import ClientPaymentStatusScreen from "../views/client/payment/status/PaymentStatus";
import { ResponseMercadoPagoPayment } from "../../data/source/remote/models/ResponseMercadoPagoPayment";
export type ClientStackParamList = {
    ClientCategoryListScreen: undefined,
    ClientProductListScreen: { category: Category },
    ClientProductDetailScreen: { product: Product },
    ShoppingBagListScreen: undefined,
    AddressListScreen: undefined,
    ClientAddressCreateScreen: {
        refPoint: string,
        latitude: number,
        longitude: number,
    } | undefined,
    ClientAddressMapScreen: undefined,
    ClientPaymentFormScreen: undefined,
    ClientPaymentsInstallmentsScreen: {
        cardToken: ResponseMercadoPagoCardToken
    },
    ClientPaymentStatusScreen: { paymentData: ResponseMercadoPagoPayment }
}
const Stack = createNativeStackNavigator<ClientStackParamList>();
export const ShoppingBagState = ({ children }: ProviderProps) => {

    return (
        <ShoppingBagProvider>
            {children}
        </ShoppingBagProvider>
    )

}

const ClientStackNavigator = () => {
    return (
        <CategoryState>
            <ProductState>
                
                        <ShoppingBagState>
                            <PlacesProvider>
                                <Stack.Navigator
                                    screenOptions={{
                                        headerShown: false
                                    }}
                                >
                                    <Stack.Screen
                                        name="ClientCategoryListScreen"
                                        component={ClientCategoryListScreen}
                                        options={({ navigation }) => ({
                                            title: 'Categories',
                                            tabBarLabel: 'Categories',
                                            headerShown: true,

                                            headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate("ShoppingBagListScreen")}>
                                                <Image source={require('../../../assets/shopping_cart.png')} style={{ width: 30, height: 30 }} />
                                            </TouchableOpacity>)
                                        })}
                                    />
                                    <Stack.Screen
                                        name="ClientProductListScreen"
                                        component={ClientProductListScreen}
                                        options={({ navigation }) => ({
                                            title: 'Products',
                                            tabBarLabel: 'Categories',
                                            headerShown: true,

                                            headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate("ShoppingBagListScreen")}>
                                                <Image source={require('../../../assets/shopping_cart.png')} style={{ width: 30, height: 30 }} />
                                            </TouchableOpacity>)
                                        })}
                                    />
                                    <Stack.Screen
                                        name="ClientProductDetailScreen"
                                        component={ClientProductDetailScreen}
                                        options={{
                                            headerShown: false
                                        }}
                                    />

                                    <Stack.Screen
                                        name="ShoppingBagListScreen"
                                        component={ShoppingBagListScreen}
                                        options={{
                                            headerShown: true,
                                            title: "Orders"
                                        }}
                                    />

                                    <Stack.Screen
                                        name="ClientAddressCreateScreen"
                                        component={ClientAddressCreateScreen}
                                        options={{
                                            headerShown: true,
                                            title: "Orders"
                                        }}
                                    />

                                    <Stack.Screen
                                        name="AddressListScreen"
                                        component={AddressListScreen}
                                        options={({ navigation }) => ({
                                            title: 'Address',
                                            tabBarLabel: 'Address',
                                            headerShown: true,

                                            headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate("ClientAddressCreateScreen")}>
                                                <Image source={require('../../../assets/add.png')} style={{ width: 30, height: 30 }} />
                                            </TouchableOpacity>)
                                        })}
                                    />

                                    <Stack.Screen
                                        name="ClientAddressMapScreen"
                                        component={ClientAddressMapScreen}
                                        options={{
                                            headerShown: true,
                                            title: "Locate your address"
                                        }}
                                    />

                                    <Stack.Screen
                                        name="ClientPaymentFormScreen"
                                        component={ClientPaymentFormScreen}
                                        options={{
                                            headerShown: true,
                                            title: "Payments"
                                        }}
                                    />

                                    <Stack.Screen
                                        name="ClientPaymentsInstallmentsScreen"
                                        component={ClientPaymentsInstallmentsScreen}
                                        options={{
                                            headerShown: true,
                                            title: "Payments"
                                        }}
                                    />

                                    <Stack.Screen
                                        name="ClientPaymentStatusScreen"
                                        component={ClientPaymentStatusScreen}
                                    />


                                </Stack.Navigator>
                            </PlacesProvider>
                        </ShoppingBagState>
            </ProductState>
        </CategoryState>
    )
}

export default ClientStackNavigator