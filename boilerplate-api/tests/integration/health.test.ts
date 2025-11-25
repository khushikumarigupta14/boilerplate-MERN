import app from '../../src/app';

describe('Sanity Check', () => {
    it('should load app', () => {
        expect(app).toBeDefined();
    });
});
