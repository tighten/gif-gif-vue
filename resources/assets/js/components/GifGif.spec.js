import { shallowMount } from '@vue/test-utils';
import GifGif from './GifGif';

window.axios = {
    post: jest.fn().mockImplementation(() => Promise.resolve([]))
};

describe('GifGif', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(GifGif, {
            propsData: {
                dataVotes: []
            }
        });
    });

    it('renders', () => {
        expect(wrapper.text()).toContain('How do you pronounce the word gif?');
        expect(wrapper).toMatchSnapshot();
    });

    it('renders with props', () => {
        let vote = {
            picked: 'jif',
            reason: 'It is how you pronounce gin',
            name: 'Samantha'
        };

        wrapper = shallowMount(GifGif, {
            propsData: {
                dataVotes: [vote]
            }
        });

        expect(wrapper.text()).toContain(vote.reason);
        expect(wrapper.text()).toContain(vote.name);
        expect(wrapper).toMatchSnapshot();
    });

    it('updates the selected pronuncation', () => {
        wrapper.find('#jif').trigger('click');
        expect(wrapper.vm.newVote.picked).toBe('jif');

        wrapper.find('#gif').trigger('click');
        expect(wrapper.vm.newVote.picked).toBe('gif');
    });

    it('submits a vote', async () => {
        let vote = {
            picked: 'jif',
            reason: 'It is how you pronounce gin',
            name: 'Samantha'
        };

        expect(wrapper.vm.votes.length).toBe(0);

        // Trigger the radio button of pronuncation
        wrapper.find('#jif').trigger('click');
        expect(wrapper.vm.newVote.picked).toBe(vote.picked);

        // Update the reason input
        let reason = wrapper.find('#reason');
        reason.element.value = vote.reason;
        reason.trigger('input');
        expect(wrapper.vm.newVote.reason).toBe(vote.reason);

        // Update the name input
        let name = wrapper.find('#name');
        name.element.value = vote.name;
        name.trigger('input');
        expect(wrapper.vm.newVote.name).toBe(vote.name);

        // Click the submit button
        wrapper.find('#submit').trigger('click');

        await wrapper.vm.$nextTick();

        expect(axios.post).toBeCalledWith('/api/votes', vote);

        // Check that the vote is added to votes
        expect(wrapper.vm.votes.length).toBe(1);

        // Check that the vote is rendered somewhere
        expect(wrapper.text()).toContain(vote.reason);
        expect(wrapper.text()).toContain(vote.name);
        expect(wrapper.vm.newVote.reason).not.toBe(vote.reason);
        expect(wrapper.vm.newVote.name).not.toBe(vote.name);
    });

    it('cannot submit without all fields', () => {
        wrapper.find('#submit').trigger('click');
        expect(wrapper.vm.votes.length).toBe(0);
    });
});
