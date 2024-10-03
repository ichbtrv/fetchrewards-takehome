# Dog Adoption Search App
![Screenshot of app](https://i.imgur.com/KJaf60s.png)

## Overview

This application is a dog adoption search platform built with **Svelte 5**, allowing users to browse and search for dogs to adopt. The app features user authentication, dog searching with various filters, and a matching system to help users find their perfect canine companion.

[**Deployed App Link**](https://fetchrewards-takehome.vercel.app/)

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Technical Details](#technical-details)
  - [Authentication](#authentication)
  - [Routing](#routing)
  - [State Management](#state-management)
  - [Styling](#styling)
- [Search Functionality](#search-functionality)
- [Favorites and Matching](#favorites-and-matching)
- [User Interface](#user-interface)
- [Form Validation](#form-validation)
- [Potential Improvements](#potential-improvements)
- [Notes](#notes)

## Features

- **User Authentication**: Users can log in and log out using their name and email.
- **Dog Search with Filtering**: Users can filter dogs by breed and age.
- **Pagination of Search Results**: Results are paginated for easier browsing.
- **Sorting of Results**: Results are sorted alphabetically by breed by default, with options to sort ascending or descending.
- **View Dog Details**: All fields of the Dog object (except for `id`) are presented in the search results.
- **Favorites and Matching**: Users can select their favorite dogs and generate a match.
- **Light and Dark Mode Support**: Users can toggle between light and dark themes.
- **Responsive Design**: The app is optimized for various screen sizes.

## Usage

1. **Login**: Enter your name and email to log in.
2. **Search Dogs**: Use the filters to search for dogs by breed and age.
3. **Pagination**: Navigate through pages of results using the pagination controls.
4. **Sort Results**: Use the sort options to sort results alphabetically by breed, ascending or descending.
5. **View Dog Details**: All available information about each dog is displayed on the search results card.
6. **Favorite Dogs**: Click the heart icon to add dogs to your favorites list.
7. **Generate a Match**: Once you have selected your favorite dogs, generate a match to find your perfect companion.

## Technical Details

### Authentication

The app uses the provided `/auth/login` endpoint to authenticate users. Upon startup or when accessing pages that require authentication, the app checks for non-sensitive user information (name and email) stored in **local storage**. If such information exists, the app attempts to log in by posting this data to the `/auth/login` endpoint. This ensures that the **HttpOnly cookie** (`fetch-access-token`) is set by the server, allowing authenticated API requests to proceed.

#### Design Choice and Elaboration

Due to API limitations, there is no dedicated endpoint to verify the current authentication session other than the `/auth/login` endpoint. To work around this, the app:

1. **Stores User Information**: Non-sensitive user data (name and email) are stored in local storage after the initial login.
2. **Re-authenticates When Necessary**: When the app starts or needs to verify authentication status, it retrieves the stored user information and re-submits it to the `/auth/login` endpoint.
3. **Simplifies Authentication Flow**: This approach allows the app to determine whether to prompt for login or proceed to the search functionality without repeatedly asking the user to enter their credentials.


**Session Handling with HttpOnly Cookie**

- **Server-Side Session Management**: The session is maintained by the server using the HttpOnly cookie. Since it's HttpOnly, it's inaccessible to client-side JavaScript, which enhances security by preventing scripts from accessing the cookie directly.
- **Automatic Inclusion**: The browser includes this cookie in all credentialed API requests (`credentials: 'include'`), allowing the server to authenticate the user on each request without further action from the client.

**Challenge with Session Validation**

- **Inability to Check Cookie Client-Side**: Since the app cannot access the HttpOnly cookie, it cannot directly determine if the session is still valid (e.g., if the cookie has expired).
- **No Session Validation Endpoint**: The API does not provide an endpoint to check the current authentication session's validity or expiration status.

**Why This Approach Was Chosen:**

- **Simplicity**: It simplifies session management within the constraints of the provided API.
- **User Experience**: Enhances the user experience by minimizing unnecessary login prompts.
- **Session Validity**: Ensures the session is active by re-authenticating, which is crucial since the app cannot check the cookie's validity directly.
- **API Constraints**: Adapts to the limitations of the provided API, which lacks a session validation endpoint.

**Considerations for Production Environment**

While this approach works within the given constraints, it's not ideal for a production environment due to the following reasons:

- **Security Risks**:
  - **Storing Sensitive Data**: Even though the app only stores non-sensitive information, storing user credentials in local storage can pose security risks if expanded to include sensitive data.
  - **Potential Exposure**: Local storage is accessible through JavaScript, making it vulnerable to XSS attacks.
- **Session Management**:
  - **Reliance on Re-authentication**: Continuously re-submitting login requests is not efficient and can lead to unnecessary server load.
  - **No Handling of Session Expiry**: The app cannot detect if the session has expired without attempting a new login.

**Alternative Approaches for Production**

- **Session Validation Endpoint**:
  - Implement an API endpoint like `/auth/validate` that returns the session's validity status based on the HttpOnly cookie.
  - This allows the app to check if the user is still authenticated without re-submitting login credentials.
- **Secure Storage Mechanisms**:
  - Utilize secure, server-side session management without storing any user credentials or sensitive data on the client.

### Routing

- **Search Route**: The dog search route utilizes URL parameters to synchronize state with the route, enabling shareable links and browser navigation.
- **Favorites and Match Route**: Users can navigate to their favorites and generate a match.


#### Design Choice and Elaboration

- **State Synchronization**: Using URL parameters ensures that the app state is reflected in the URL, allowing users to bookmark or share specific searches.
- **Omission of Individual Dog Routes**: A specific route for individual dogs (`/dog/[id]`) was intentionally omitted. Since all necessary dog information is displayed on the search results card, and to keep the app focused and streamlined, I chose not to implement individual dog detail pages.

**Why This Approach Was Chosen:**

- **Time Constraints**: Prioritizing features that meet the minimum requirements within the given timeframe.
- **User Experience**: Providing all necessary information upfront reduces the number of clicks required for users to view dog details.
- **Simplicity**: Keeping the routing structure simple aids in maintainability.

### State Management
The app utilizes Svelte 5's state management capabilities, which are still in release candidate status. Full documentation for Svelte 5 is not yet available, but the implementation attempts to follow current best practices.

### Styling

- **Responsive Design**: The app is styled to be responsive across various devices.
- **Themes**: Light and dark mode are supported.
- **Component Library**: The app utilizes **shadcn-svelte**, a community-led Svelte port of shadcn/ui, for reusable UI components.

#### Design Choice and Elaboration

- **Use of shadcn-svelte**: To accelerate development and ensure a consistent and high-quality user interface, the app employs **shadcn-svelte**.

**Why This Approach Was Chosen:**

- **Rapid Development**: Utilizing shadcn-svelte allowed for faster implementation of UI components, enabling more time to focus on core functionality and meeting the assignment's requirements.
- **Customization and Control**: Since shadcn-svelte components are meant to be copied into the project rather than installed as a dependency, they offer full ownership and flexibility. This means the components can be customized extensively to fit the specific needs of the app.
- **Consistency**: Using a well-designed component library ensures a consistent look and feel throughout the app, enhancing the user experience.

**Building Custom Components on Top:**

- **Tailored UI Elements**: Custom components were built on top of shadcn-svelte to further tailor the UI to the app's specific requirements.
- **Flexibility**: This approach allows for easier customization and adjustments without being constrained by the limitations of a standard third-party library.

**Considerations:**

- **Community-Led Project**: As an unofficial Svelte port of shadcn/ui, shadcn-svelte benefits from community contributions and support.
- **Documentation and Support**: While the components are well-designed, being a community project may mean that documentation is less comprehensive than that of larger, established libraries.

**Areas for Improvement:**

- **Fine-Tuning Styles**: While shadcn-svelte provides a strong foundation, there are areas where implemented styles can be further refined, such as the layout of the dog container and match route when displaying a dog match. This was not optimized due to time constraints.
- **Skeleton Loader Sizing**: Adjustments are needed to resize the skeleton loader to match the actual card sizes for better visual consistency.

## Search Functionality

- **Filtering**: Users can filter dogs by breed and age. The breed filter uses the list of breeds provided by the `/dogs/breeds` endpoint.
- **Pagination**: The search results are paginated, with controls to navigate between pages.
- **Sorting**: Results are sorted alphabetically by breed by default. Users can change the sort order to ascending or descending.
- **Display of Dog Data**: All fields of the Dog object (except for `id`) are displayed in the search results, including image, name, age, zip code, and breed.

#### Design Choice and Elaboration

- **API Utilization**: The search functionality is designed to leverage the API's capabilities fully, including sorting and pagination.
- **User Experience**: Providing comprehensive filtering and sorting options enhances usability and helps users find dogs that meet their preferences.

**Omitted Feature: Location Filtering**

- **Reason**: Filtering by location was not implemented due to time constraints and the complexity involved in integrating the `/locations` endpoints.
- **Future Plans**: Given more time, location-based filtering would be a priority enhancement to improve search relevance.

## Favorites and Matching

- **Favoriting Dogs**: Users can add dogs to their favorites list by clicking the heart icon on each dog's card.
- **Generating a Match**: When the user is ready, they can generate a match based on their favorited dogs. The app sends the list of favorite dog IDs to the `/dogs/match` endpoint and displays the matched dog.

#### Design Choice and Elaboration

- **Immediate Feedback**: The matching functionality provides immediate and engaging feedback to the user, enhancing the interactive aspect of the app.
- **Favorites Management**: Favorites are managed within the app's state for simplicity.

**Considerations:**

- **Persistence**: Currently, favorites are persisted across sessions in the same object as the user in local storage, the allows for a user to revisit the website and still have their access to their favorites without the presence of a database for this exercise.

## User Interface
- **Navigation**: The app features a navigation bar with links to the search page, favorites, and placeholders for profile and settings.
- **Easter Egg**: A playful feature where a paw print icon follows the user's mouse cursor on the home page.
- **Accessibility**: Accessibility features are implemented with shadcn-svelte, with plans for further improvements.


#### Design Choice and Elaboration

- **Placeholders for Future Features**: Including placeholders for profile and settings pages provides a more complete app feel and indicates areas for future development.
- **User Engagement**: The paw print easter egg adds a delightful touch, enhancing the user's experience.

**Why These Choices Were Made:**

- **Time Management**: Focused on implementing core features first, with plans to expand UI elements later.
- **User Experience**: Small touches like the easter egg improve the overall enjoyment of the app.

## Form Validation

- **Login Form**: The login form includes basic client-side validation to ensure that the name and email fields are not empty.
- **Error Handling**: The app handles errors from API requests gracefully, providing feedback to the user.

## Potential Improvements

Given more time, the following enhancements could be implemented:

- **Location-Based Filtering**: Implement filtering of dogs based on location using the `/locations` endpoints.
- **Profile and Settings Pages**: Build out the profile and settings pages to enhance user experience.
- **Advanced Form Validation**: Implement more robust input validation and server-side validation.
- **Testing**: Implement unit and integration tests to ensure code reliability.
- **Performance Enhancements**: Implement advanced caching strategies to improve performance.
- **Analytics and Logging**: Add analytics tracking and error logging.

## Notes

This project was developed as part of a coding exercise to showcase my skills in frontend development. I attempted to fulfill all minimum requirements specified in the assignment in the specified within the time constraint, with additional features and improvements added where possible. 

