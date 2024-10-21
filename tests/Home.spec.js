import { mount } from '@vue/test-utils';
import Home from '../src/views/Home.vue';
import { createTestingPinia } from '@pinia/testing';

describe('Home.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Home, {
            global: {
                plugins: [createTestingPinia()], // Mocking Pinia store for testing
            },
        });
    });

    it('renders the featured posts section', () => {
        expect(wrapper.find('h2').text()).toContain('Featured Posts');
    });

    it('renders search input correctly', () => {
        const searchInput = wrapper.find('input[type="text"]');
        expect(searchInput.exists()).toBe(true);
        expect(searchInput.attributes('placeholder')).toBe('Search posts by title or author...');
    });

    it('updates search query when input is entered', async () => {
        const searchInput = wrapper.find('input[type="text"]');
        await searchInput.setValue('test query');
        expect(wrapper.vm.searchQuery).toBe('test query');
    });

    it('filters posts based on search query', async () => {
        const searchInput = wrapper.find('input[type="text"]');
        await searchInput.setValue('author name');

        const filteredPosts = wrapper.vm.filteredPosts;
        // Assuming you have posts with the matching query 'author name'
        expect(filteredPosts.length).toBeGreaterThan(0);
    });
});
