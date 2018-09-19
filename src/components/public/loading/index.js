/**
 * @return {null}
 */

export default function Loading({ error, pastDelay }) {

    if (error) {
        return <div>Error!</div>;
    } else if (pastDelay) {
        return <div>Loading...</div>;
    } else {
        return null;
    }
}