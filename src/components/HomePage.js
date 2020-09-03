import React from 'react';

import {Carousel,CarouselCaption,CarouselItem,CarouselControl,CarouselIndicators,
        Card, CardImg, CardTitle, CardText, CardDeck,
        CardSubtitle, CardBody} from 'reactstrap';
//citation for carousel: https://bit.dev/reactstrap/reactstrap/carousel
const items = [
    {
        src: 'https://cdn.vox-cdn.com/thumbor/lP-QfmxscksF679JJp9ZKSe0uK8=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/16023078/53909795_1224319884384279_459485548470337536_o.jpg',
        altText: 'Slide 1',
        caption: 'Welcome to Cool Crepes!',
    },
    {
        src: 'https://static8.depositphotos.com/1005629/991/i/950/depositphotos_9919108-stock-photo-dessert-collage.jpg',
        altText: 'Slide 2',
        caption: 'All the sweets you need!',
        caption2: 'Lovin it'
    },
    {
        src: 'https://i.pinimg.com/originals/16/28/5a/16285a996fa81ce59972eeaebbd543ed.jpg',
        altText: 'Slide 3',
        caption: 'Special Colorful and Delicious Mille Crepe' ,
        caption2: 'Delicious (*≧▽≦)'
    }
];

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onAnimating = this.onAnimating.bind(this);
        this.onNoAnimating = this.onNoAnimating.bind(this);
        this.trendingPage = this.trendingPage.bind(this);
        this.salesPage = this.salesPage.bind(this);
        this.featuredPage = this.featuredPage.bind(this);
    }
    trendingPage(){
        this.props.history.push('/trending');
    }

    salesPage(){
        this.props.history.push('/sales');
    }

    featuredPage(){
        this.props.history.push('/featured');
    }

    onAnimating() {
        this.animating = true;
    }

    onNoAnimating() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            return (
                <CarouselItem
                onAnimating={this.onAnimating}
                onNoAnimating={this.onNoAnimating}
                key={item.src}
                >
                <img src={item.src} alt={item.altText} />
                <CarouselCaption captionText={item.caption2} captionHeader={item.caption} />
                </CarouselItem>
            );
        });

        return (
            <div>
            <Carousel
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
            >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
            {slides}
            <CarouselControl direction='prev' directionText='Previous' onClickHandler={this.previous} />
            <CarouselControl direction='next' directionText='Next' onClickHandler={this.next} />
            </Carousel>
            <br/><br/>

            <CardDeck>
            <Card className="cardHoverGradientColor" tag="a" onClick = {this.trendingPage.bind(this)}>
            <CardImg className = "cardImage" src="https://i.ytimg.com/vi/3Jz4cqxPv7w/maxresdefault.jpg" />
                <CardBody className="cardBodyHoverGradientColor">
                <CardTitle className="cardTitle">Trending Now</CardTitle>
<CardSubtitle>What many customers love!</CardSubtitle>
<CardText>Starting from $10.99</CardText>
</CardBody>
</Card>
<Card className="cardHoverGradientColor" tag="a" onClick = {this.salesPage.bind(this)}>
    <CardImg className = "cardImage" src="https://media.gq.com/photos/5ef6590ff0469a259eb99c15/3:2/w_1686,h_1124,c_limit/july-4-day-sales.jpg"/>
        <CardBody className="cardBodyHoverGradientColor">
        <CardTitle className="cardTitle">On Sale</CardTitle>
<CardSubtitle>Shop now for lowest price!</CardSubtitle>
<CardText>Starting from $0.99</CardText>
</CardBody>
</Card>
<Card className="cardHoverGradientColor" tag="a" onClick = {this.featuredPage.bind(this)}>
    <CardImg className = "cardImage" src="https://grapee.jp/en/wp-content/uploads/sub1-203.jpg" />
        <CardBody className="cardBodyHoverGradientColor">
        <CardTitle className="cardTitle">Featured or New Arrivals</CardTitle>
<CardSubtitle>Newest and delicious!</CardSubtitle>
<CardText>Starting from $5.99</CardText>
</CardBody>
</Card>
</CardDeck>
</div>
);
}
}

export default HomePage;