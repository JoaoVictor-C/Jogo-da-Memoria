import PropTypes from 'prop-types';

export default function Card({id, name, image, flipped, found, flipCard, uniqueID, animating, cards, animatingFlipped}) {
    return (
        <div className={`card ${found ? "found" : ""} ${animating ? "animating" : ""} ${animatingFlipped ? "animatingFlipped" : ""}`} onClick={
            () => {
                if (!found && !flipped && (cards.filter(card => card.flipped && !card.found).length < 2)) {
                    flipCard(id, uniqueID)
                }
            }
        }>
            <div className={`card-front ${found ? "found" : "hidden"} ${flipped ? "forceAppear" : "hidden"} `}>
                <img src={image} alt={name} />
            </div>
            <div className={`card-back ${found ? "hidden" : ""} ${flipped ? "hidden" : ""}`}>
                <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages6.fanpop.com%2Fimage%2Fphotos%2F38900000%2FPokeball-pokemon-38912743-894-894.png&f=1&nofb=1&ipt=765237935af681eed5a5882dff06e956fae4613fa2dbde4fd1d8895fe4109f3a&ipo=images" alt="back card" />
            </div>
        </div>
    )
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    flipped: PropTypes.bool.isRequired,
    found: PropTypes.bool.isRequired,
    flipCard: PropTypes.func.isRequired,
    uniqueID: PropTypes.number.isRequired,
    animating: PropTypes.bool.isRequired,
    cards: PropTypes.array.isRequired,
    animatingFlipped: PropTypes.bool.isRequired,
};
