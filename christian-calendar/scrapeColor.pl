#!/usr/bin/perl
use strict;
use warnings;
use HTML::Parser;
use String::Util qw(trim);

my $filename = shift();

my $inside_td = 0;
my $bgcolor = '';
my $content = '';

my $parser = HTML::Parser->new(
    start_h => [\&start_td, 'tagname,attr'],
    end_h => [\&end_td, 'tagname'],
    text_h => [\&text_handler, 'dtext']
);

open(my $fh, '<', $filename) or die "Could not open file '$filename' $!";

$parser->parse_file($fh);

close($fh);

sub start_td {
    my ($tagname, $attr) = @_;

    if ($tagname eq 'td' and exists $attr->{bgcolor}) {
        $inside_td = 1;
        $bgcolor = $attr->{bgcolor};
        $content = '';
    }
}

sub end_td {
    my ($tagname) = @_;

    if ($tagname eq 'td' and $inside_td) {
        $inside_td = 0;
	$content = trim($content);
	if ($content) {
           print "$bgcolor:$content\n";
	}
    }
}

sub text_handler {
    my ($text) = @_;

    if ($inside_td) {
        $content .= $text;
    }
}

