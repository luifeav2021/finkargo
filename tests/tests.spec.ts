import { test, expect } from '@playwright/test'
import { Login } from './tasks/Login';
import { Home } from './tasks/Home';
import { Anotations } from './util/Anotations';
import { ClientInformation } from './tasks/ClientInformation';
import { CheckoutSummary } from './tasks/CheckoutSummary';
import { CheckoutComplete } from './tasks/CheckoutComplete';

test('Scenario: el usuario realiza el proceso de compra de un producto en la pagina de saucedemo', async ({ page }) => {

    Anotations.given('que el usuario carga la pagina saucedemo');
    await page.goto('https://saucedemo.com')
   // await page.screenshot({path:'home.png', fullPage:true}) 
    const login = new Login(page)
    const home = new Home(page)
    const clientInfo = new ClientInformation(page)
    const checkoutSummary = new CheckoutSummary(page)
    const checkoutComplete = new CheckoutComplete(page)

    Anotations.when('el usuario inicia sesion con usuario y la contraseña');
    await login.loginWithCredentials('standard_user', 'secret_sauce')
    //await page.screenshot({path:'login.png', fullPage:true}) 
    
    Anotations.then('el usuario puede ver en pantalla el titulo Products')
    await home.checkSuccessfulLogin()
    //await page.screenshot({path:'successfulLogin.png', fullPage:true}) 
    await home.checkProductTitle
    
    //Genero un producto aleatorio
    const itemsContainer = await page.locator('#inventory_container .inventory_item').all()
    const randomIndex = Math.floor(Math.random() * itemsContainer.length)
    const randomItem = itemsContainer[randomIndex]

    const expectedName = await randomItem.locator('.inventory_item_name').innerText()
    const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()

    //Ingresamos a la pagina de detalles del producto aleatorio
    await randomItem.locator('.inventory_item_name').click()


    //#############Pagina de detalles del carrito***********************************

    //Verificar que la pagina de detalles del producto se cargue correctamente
    const actualNameDetailsPage = await page.locator('.inventory_details_name').innerText()
    const actualDescriptionDetailsPage = await page.locator('.inventory_details_desc').innerText()
    const actualPriceDetailsPage = await page.locator('.inventory_details_price').innerText()

    expect(actualNameDetailsPage).toEqual(expectedName)
    expect(actualDescriptionDetailsPage).toEqual(expectedDescription)
    expect(actualPriceDetailsPage).toEqual(expectedPrice)

    //await page.getByRole('button', {name:'Add to cart"'}).click()
    await page.locator('//*[@id="add-to-cart"]').click()

    //Hacemos clic en el boton del carrito de compras
    await page.locator('a.shopping_cart_link').click()
    await page.pause()

    //await page.locator('//*[@id="back-to-products"]').click()


    //#############Pagina del carrito***********************************

    //Validar que el boton Checkout este visible
    await expect(page.getByRole('button', {name: 'Checkout'})).toBeVisible()

    const actualNameYouCartPage = await page.locator('.inventory_item_name').innerText()
    const actualDescriptionYouCartPage  = await page.locator('.inventory_item_desc').innerText()
    const actualPriceYouCartPage  = await page.locator('.inventory_item_price').innerText()

    expect(actualNameYouCartPage).toEqual(expectedName)
    expect(actualDescriptionYouCartPage).toEqual(expectedDescription)
    expect(actualPriceYouCartPage).toEqual(expectedPrice)

    await page.getByRole('button', {name: 'Checkout'}).click()

    //###################### Client Information Page ##############
    //await clientInfo.checkContinueBtnVisible()
    await clientInfo.fillClientInformation('Luisa Fernanda', 'Arango Velez','10000112')
   
    
    //###################### Checkout Summary Page ##############
    await checkoutSummary.checkPaymentLblVisible()
    await checkoutSummary.checkShippingLblVisible()
    await checkoutSummary.checkPriceTotalLblVisible()
    await checkoutSummary.clickOnFinish()

})

